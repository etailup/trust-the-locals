import type { VercelRequest, VercelResponse } from '@vercel/node'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { name, email, subject, message } = req.body ?? {}

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  const { error } = await resend.emails.send({
    from: 'Trust the Locals <noreply@etailup.com>',
    to: 'lapo@etailup.com',
    replyTo: email,
    subject: `[Contatto] ${subject}`,
    html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: Georgia, serif; background: #FAF7F2; padding: 40px; color: #1a2744;">
  <div style="max-width: 600px; margin: 0 auto; background: white; border: 1px solid #e8e4db; padding: 40px;">
    <div style="text-align: center; margin-bottom: 32px;">
      <img src="https://gsxd43np3iiszkai.public.blob.vercel-storage.com/file_final_2.svg" alt="Trust the Locals" style="height: 48px; width: auto;" />
    </div>
    <h1 style="font-size: 22px; margin-bottom: 4px;">Nuovo messaggio dal sito</h1>
    <hr style="border: none; border-top: 1px solid #e8e4db; margin: 20px 0;">
    <table style="width: 100%; border-collapse: collapse;">
      <tr><td style="padding: 8px 0; color: #666; width: 100px;">Nome</td><td style="padding: 8px 0; font-weight: bold;">${name}</td></tr>
      <tr><td style="padding: 8px 0; color: #666;">Email</td><td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #1a2744;">${email}</a></td></tr>
      <tr><td style="padding: 8px 0; color: #666;">Oggetto</td><td style="padding: 8px 0;">${subject}</td></tr>
    </table>
    <h3 style="margin-top: 24px; margin-bottom: 8px; font-size: 13px; text-transform: uppercase; letter-spacing: 0.1em; color: #666;">Messaggio</h3>
    <p style="line-height: 1.7; background: #FAF7F2; padding: 16px; border-left: 3px solid #1a2744; white-space: pre-wrap;">${message}</p>
    <p style="margin-top: 32px; font-size: 12px; color: #999;">Rispondi direttamente a questa email per contattare ${name}.</p>
  </div>
</body>
</html>
`,
  })

  if (error) {
    console.error('[contact] resend error:', error)
    return res.status(500).json({ error: 'Failed to send message' })
  }

  return res.status(200).json({ success: true })
}
