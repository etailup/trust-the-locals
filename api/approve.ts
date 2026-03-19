import type { VercelRequest, VercelResponse } from '@vercel/node'
import { Resend } from 'resend'
import { supabaseAdmin } from './_supabaseAdmin.js'

const resend = new Resend(process.env.RESEND_API_KEY)

const html = (title: string, body: string) => `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>${title}</title></head>
<body style="font-family: Georgia, serif; background: #FAF7F2; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; padding: 40px;">
  <div style="max-width: 500px; width: 100%; background: white; border: 1px solid #e8e4db; padding: 48px; text-align: center;">
    <h1 style="color: #1a2744; font-size: 28px; margin-bottom: 16px;">${title}</h1>
    <p style="color: #555; line-height: 1.7; font-size: 16px;">${body}</p>
  </div>
</body>
</html>
`

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { id, token } = req.query as { id: string; token: string }

  if (!id || !token) {
    return res.status(400).send(html('Errore', 'Parametri mancanti.'))
  }

  const { data: application, error } = await supabaseAdmin
    .from('applications')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !application) {
    return res.status(404).send(html('Non trovata', 'Candidatura non trovata.'))
  }

  if (application.approval_token !== token) {
    return res.status(403).send(html('Non autorizzato', 'Token non valido.'))
  }

  if (application.status === 'approved') {
    return res.status(200).send(html('Già approvata', `La candidatura di <strong>${application.name}</strong> è già stata approvata.`))
  }

  // Update status
  await supabaseAdmin
    .from('applications')
    .update({ status: 'approved' })
    .eq('id', id)

  // Create auth user
  const { data: createdUserData, error: createUserError } = await supabaseAdmin.auth.admin.createUser({
    email: application.email,
    email_confirm: true,
    user_metadata: { name: application.name },
  })

  if (createUserError) {
    // Ignore "already registered" — user may have been created in a previous attempt
    console.warn('[approve] createUser warning:', createUserError.message)
  } else {
    console.log('[approve] user created — id:', createdUserData?.user?.id, 'email:', application.email)
  }

  // Upsert profile row — tolerates re-runs if user already existed
  const userId = createdUserData?.user?.id
  if (userId) {
    const { error: profileError } = await supabaseAdmin
      .from('profiles')
      .upsert({
        id: userId,
        name: application.name,
        company: application.company_name ?? null,
        phone: application.phone ?? null,
        type: application.form_type ?? null,
        country: application.country ?? null,
        website: application.website ?? null,
        linkedin_url: application.linkedin_url ?? null,
        annual_clients: application.annual_clients ?? null,
      })
    if (profileError) console.warn('[approve] profile upsert warning:', profileError.message)
    else console.log('[approve] profile upserted for user:', userId)
  }

  // Generate magic link
  const baseUrl = (process.env.BASE_URL || process.env.VITE_BASE_URL || 'https://trusthelocals.com').trim()
  const redirectTo = `${baseUrl}/portal/set-password`
  console.log('[approve] BASE_URL raw:', JSON.stringify(process.env.BASE_URL))
  console.log('[approve] redirectTo:', redirectTo)

  const { data: linkData, error: linkError } = await supabaseAdmin.auth.admin.generateLink({
    type: 'magiclink',
    email: application.email,
    options: { redirectTo },
  })

  if (linkError || !linkData?.properties?.action_link) {
    console.error('[approve] magic link error:', linkError)
    return res.status(500).send(html('Errore', 'Impossibile generare il link di accesso.'))
  }

  console.log('[approve] magic link generated for user id:', linkData?.user?.id)

  // Build a custom URL with OTP token in the hash fragment.
  // Email scanners make HTTP GET requests and never see hash fragments — only
  // real browser JS can read window.location.hash. Putting the token here
  // prevents Google/Gmail pre-scanner from consuming the one-time OTP.
  // Use email_otp (the raw OTP) — this is what supabase.auth.verifyOtp() expects
  // on the client. hashed_token is the pre-hashed version used in the action_link
  // GET URL which goes through a different server-side verification code path.
  const otpToken = linkData.properties.email_otp
  const setPasswordUrl = `${baseUrl}/portal/set-password#otp=${otpToken}&email=${encodeURIComponent(application.email)}`
  console.log('[approve] setPasswordUrl (hash, not logged):', setPasswordUrl.split('#')[0] + '#[hidden]')

  const welcomeHtml = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: Georgia, serif; background: #FAF7F2; padding: 40px; color: #1a2744;">
  <!-- Gmail preheader spacer — prevents Gmail from collapsing email content -->
  <div style="display:none;max-height:0;overflow:hidden;">&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;</div>
  <div style="max-width: 600px; margin: 0 auto; background: white; border: 1px solid #e8e4db; padding: 48px; text-align: center;">
    <div style="margin-bottom: 32px;">
      <img src="https://gsxd43np3iiszkai.public.blob.vercel-storage.com/file_final_2.svg" alt="Trust the Locals" style="height: 48px; width: auto;" />
    </div>
    <h1 style="font-size: 28px; margin-bottom: 8px;">La tua candidatura è stata approvata!</h1>
    <div style="width: 48px; height: 1px; background: #1a2744; margin: 24px auto;"></div>
    <p style="color: #555; line-height: 1.7; font-size: 16px; margin-bottom: 32px;">
      Benvenuto/a nel portale Trust the Locals, ${application.name}.<br>
      Clicca il pulsante qui sotto per accedere al tuo account.
    </p>
    <a href="${setPasswordUrl}" style="display: inline-block; background: #1a2744; color: #FAF7F2; text-decoration: none; padding: 16px 40px; font-family: Georgia, serif; font-size: 16px; letter-spacing: 0.15em;">
      ACCEDI AL PORTALE
    </a>
    <p style="margin-top: 32px; font-size: 12px; color: #999;">
      Il link è valido per 24 ore. Se hai problemi, contattaci a reservations@trusthelocals.com
    </p>
  </div>
</body>
</html>
`

  await resend.emails.send({
    from: 'Trust the Locals <noreply@etailup.com>',
    to: application.email,
    subject: 'La tua candidatura è stata approvata — Trust the Locals',
    html: welcomeHtml,
  })

  return res.status(200).send(html(
    'Candidatura approvata',
    `La candidatura di <strong>${application.name}</strong> è stata approvata. Un'email con il link di accesso è stata inviata a ${application.email}.`
  ))
}
