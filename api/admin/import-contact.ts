import type { VercelRequest, VercelResponse } from '@vercel/node'
import { Resend } from 'resend'
import { supabaseAdmin } from '../_supabaseAdmin.js'

const resend = new Resend(process.env.RESEND_API_KEY)

function isValidEmail(email: string): boolean {
  const atIdx = email.indexOf('@')
  if (atIdx < 1) return false
  const domain = email.slice(atIdx + 1)
  return domain.includes('.') && domain.length > 2
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  // --- Auth check ---
  const authHeader = req.headers['authorization']
  const jwt = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null
  if (!jwt) return res.status(401).json({ error: 'auth_expired' })

  const { data: { user: callerAuth }, error: authError } = await supabaseAdmin.auth.getUser(jwt)
  if (authError || !callerAuth) return res.status(401).json({ error: 'auth_expired' })

  const { data: callerProfile } = await supabaseAdmin
    .from('profiles')
    .select('is_admin')
    .eq('id', callerAuth.id)
    .single()

  if (!callerProfile?.is_admin) return res.status(403).json({ error: 'forbidden' })

  // --- Input validation ---
  const { email, name, company, phone } = req.body ?? {}

  if (!email || typeof email !== 'string' || !isValidEmail(email.trim())) {
    return res.status(400).json({ status: 'error', message: 'email non valida' })
  }

  const cleanEmail = email.trim()
  const cleanName = (name && typeof name === 'string') ? name.trim() : null
  const cleanCompany = (company && typeof company === 'string') ? company.trim() : null
  const cleanPhone = (phone && typeof phone === 'string') ? phone.trim() : null

  const baseUrl = (process.env.BASE_URL || process.env.VITE_BASE_URL || 'https://trusthelocals.com').trim()

  // --- Create auth user (continue even if duplicate) ---
  const { data: createdUserData, error: createUserError } = await supabaseAdmin.auth.admin.createUser({
    email: cleanEmail,
    email_confirm: true,
    user_metadata: { name: cleanName ?? '' },
  })

  if (createUserError) {
    console.warn('[import-contact] createUser warning:', createUserError.message)
  }

  // --- Generate magic link (works on both new and existing users) ---
  const { data: linkData, error: linkError } = await supabaseAdmin.auth.admin.generateLink({
    type: 'magiclink',
    email: cleanEmail,
    options: { redirectTo: `${baseUrl}/portal/set-password` },
  })

  if (linkError || !linkData?.properties?.action_link) {
    console.error('[import-contact] generateLink error:', linkError)
    return res.status(500).json({ status: 'error', message: 'Impossibile generare il link di accesso.' })
  }

  // --- Upsert profile (userId from createUser, or fallback to generateLink) ---
  // Note: intentionally different from approve.ts which guards on userId.
  // Here we always upsert to support re-imports that update profile fields.
  const userId = createdUserData?.user?.id ?? linkData.user.id

  const { error: profileError } = await supabaseAdmin
    .from('profiles')
    .upsert({
      id: userId,
      name: cleanName,
      company: cleanCompany,
      phone: cleanPhone,
    })

  if (profileError) console.warn('[import-contact] profile upsert warning:', profileError.message)

  // --- Build OTP URL (hash fragment prevents email-scanner consumption) ---
  const otpToken = linkData.properties.email_otp
  const setPasswordUrl = `${baseUrl}/portal/set-password#otp=${otpToken}&email=${encodeURIComponent(cleanEmail)}`

  // --- Send welcome email ---
  const greeting = cleanName ? cleanName : 'Benvenuto/a'

  const welcomeHtml = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: Georgia, serif; background: #FAF7F2; padding: 40px; color: #1a2744;">
  <!-- Gmail preheader spacer -->
  <div style="display:none;max-height:0;overflow:hidden;">Il tuo accesso al portale privato è pronto.&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;</div>
  <div style="max-width: 600px; margin: 0 auto; background: white; border: 1px solid #e8e4db; padding: 48px; text-align: center;">
    <div style="margin-bottom: 32px;">
      <img src="https://gsxd43np3iiszkai.public.blob.vercel-storage.com/file_final_2.svg" alt="Trust the Locals" style="height: 48px; width: auto;" />
    </div>
    <h1 style="font-size: 28px; margin-bottom: 8px;">Accedi a Trust the Locals</h1>
    <div style="width: 48px; height: 1px; background: #1a2744; margin: 24px auto;"></div>
    <p style="color: #555; line-height: 1.7; font-size: 16px; margin-bottom: 32px;">
      ${greeting},<br>
      Siamo lieti di darti accesso al portale privato Trust the Locals.<br>
      Clicca il pulsante qui sotto per scegliere la tua password e accedere alle esperienze riservate.
    </p>
    <a href="${setPasswordUrl}" style="display: inline-block; background: #1a2744; color: #FAF7F2; text-decoration: none; padding: 16px 40px; font-family: Georgia, serif; font-size: 16px; letter-spacing: 0.15em;">
      ACCEDI AL PORTALE
    </a>
    <p style="margin-top: 32px; font-size: 12px; color: #999;">
      Il link è valido per un singolo utilizzo. Se hai problemi, contattaci a reservations@trusthelocals.com
    </p>
  </div>
</body>
</html>
`

  const { error: emailError } = await resend.emails.send({
    from: 'Trust the Locals <noreply@etailup.com>',
    to: cleanEmail,
    subject: 'Accedi a Trust the Locals',
    html: welcomeHtml,
  })

  if (emailError) {
    console.error('[import-contact] resend error:', emailError)
    return res.status(500).json({ status: 'error', message: 'Errore invio email.' })
  }

  console.log('[import-contact] ok — email:', cleanEmail, 'userId:', userId)
  return res.status(200).json({ status: 'ok' })
}
