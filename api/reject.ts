import type { VercelRequest, VercelResponse } from '@vercel/node'
import { supabaseAdmin } from './_supabaseAdmin'

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
    .select('id, name, approval_token, status')
    .eq('id', id)
    .single()

  if (error || !application) {
    return res.status(404).send(html('Non trovata', 'Candidatura non trovata.'))
  }

  if (application.approval_token !== token) {
    return res.status(403).send(html('Non autorizzato', 'Token non valido.'))
  }

  if (application.status === 'rejected') {
    return res.status(200).send(html('Già rifiutata', `La candidatura di <strong>${application.name}</strong> è già stata rifiutata.`))
  }

  await supabaseAdmin
    .from('applications')
    .update({ status: 'rejected' })
    .eq('id', id)

  return res.status(200).send(html(
    'Candidatura rifiutata',
    `La candidatura di <strong>${application.name}</strong> è stata rifiutata.`
  ))
}
