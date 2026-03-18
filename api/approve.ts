import type { VercelRequest, VercelResponse } from '@vercel/node'
import { Resend } from 'resend'
import { supabaseAdmin } from './_supabaseAdmin'

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
  const { error: createUserError } = await supabaseAdmin.auth.admin.createUser({
    email: application.email,
    email_confirm: true,
    user_metadata: { name: application.name },
  })

  if (createUserError && createUserError.message !== 'User already registered') {
    console.error('Create user error', createUserError)
    return res.status(500).send(html('Errore', 'Impossibile creare l\'account utente.'))
  }

  // Generate magic link
  const { data: linkData, error: linkError } = await supabaseAdmin.auth.admin.generateLink({
    type: 'magiclink',
    email: application.email,
  })

  if (linkError || !linkData?.properties?.action_link) {
    console.error('Magic link error', linkError)
    return res.status(500).send(html('Errore', 'Impossibile generare il link di accesso.'))
  }

  const magicLink = linkData.properties.action_link

  const welcomeHtml = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: Georgia, serif; background: #FAF7F2; padding: 40px; color: #1a2744;">
  <div style="max-width: 600px; margin: 0 auto; background: white; border: 1px solid #e8e4db; padding: 48px; text-align: center;">
    <h1 style="font-size: 28px; margin-bottom: 8px;">La tua candidatura è stata approvata!</h1>
    <div style="width: 48px; height: 1px; background: #1a2744; margin: 24px auto;"></div>
    <p style="color: #555; line-height: 1.7; font-size: 16px; margin-bottom: 32px;">
      Benvenuto/a nel portale Trust the Locals, ${application.name}.<br>
      Clicca il pulsante qui sotto per accedere al tuo account.
    </p>
    <a href="${magicLink}" style="display: inline-block; background: #1a2744; color: #FAF7F2; text-decoration: none; padding: 16px 40px; font-family: Georgia, serif; font-size: 16px; letter-spacing: 0.15em;">
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
    from: 'Trust the Locals <noreply@trusthelocals.com>',
    to: application.email,
    subject: 'La tua candidatura è stata approvata — Trust the Locals',
    html: welcomeHtml,
  })

  return res.status(200).send(html(
    'Candidatura approvata',
    `La candidatura di <strong>${application.name}</strong> è stata approvata. Un'email con il link di accesso è stata inviata a ${application.email}.`
  ))
}
