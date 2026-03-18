import type { VercelRequest, VercelResponse } from '@vercel/node'
import { Resend } from 'resend'
import { supabaseAdmin } from './_supabaseAdmin.js'

const resend = new Resend(process.env.RESEND_API_KEY)

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const {
    form_type,
    name,
    contactName,
    agencyName,
    email,
    phone,
    countryCode,
    country,
    description,
    website,
    linkedinUrl,
    annualClients,
  } = req.body

  // Normalise name: agency form uses contactName, private uses name
  const applicantName = name || contactName || ''
  const companyName = agencyName || null
  const fullPhone = countryCode ? `${countryCode}${phone}` : phone || null

  // Map form_type values to DB check constraint values
  const dbFormType = form_type === 'apply_form' ? 'agency' : 'private'

  const { data: application, error } = await supabaseAdmin
    .from('applications')
    .insert({
      form_type: dbFormType,
      name: applicantName,
      email,
      phone: fullPhone,
      country: country || null,
      description: description || null,
      company_name: companyName,
      website: website || null,
      linkedin_url: linkedinUrl || null,
      annual_clients: annualClients || null,
    })
    .select()
    .single()

  if (error) {
    console.error('Supabase insert error', error)
    return res.status(500).json({ error: 'Failed to save application' })
  }

  const baseUrl = process.env.VITE_BASE_URL || 'https://trusthelocals.com'
  const approveUrl = `${baseUrl}/api/approve?id=${application.id}&token=${application.approval_token}`
  const rejectUrl = `${baseUrl}/api/reject?id=${application.id}&token=${application.approval_token}`

  const formLabel = dbFormType === 'agency' ? 'Agenzia' : 'Privato'

  const emailHtml = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: Georgia, serif; background: #FAF7F2; padding: 40px; color: #1a2744;">
  <div style="max-width: 600px; margin: 0 auto; background: white; border: 1px solid #e8e4db; padding: 40px;">
    <div style="text-align: center; margin-bottom: 32px;">
      <img src="https://gsxd43np3iiszkai.public.blob.vercel-storage.com/file_final_2.svg" alt="Trust the Locals" style="height: 48px; width: auto;" />
    </div>
    <h1 style="font-size: 24px; margin-bottom: 8px;">Nuova candidatura — ${formLabel}</h1>
    <hr style="border: none; border-top: 1px solid #e8e4db; margin: 24px 0;">

    <table style="width: 100%; border-collapse: collapse;">
      <tr><td style="padding: 8px 0; color: #666; width: 140px;">Nome</td><td style="padding: 8px 0; font-weight: bold;">${applicantName}</td></tr>
      <tr><td style="padding: 8px 0; color: #666;">Email</td><td style="padding: 8px 0;">${email}</td></tr>
      ${fullPhone ? `<tr><td style="padding: 8px 0; color: #666;">Telefono</td><td style="padding: 8px 0;">${fullPhone}</td></tr>` : ''}
      ${country ? `<tr><td style="padding: 8px 0; color: #666;">Paese</td><td style="padding: 8px 0;">${country}</td></tr>` : ''}
      ${companyName ? `<tr><td style="padding: 8px 0; color: #666;">Agenzia</td><td style="padding: 8px 0;">${companyName}</td></tr>` : ''}
      ${website ? `<tr><td style="padding: 8px 0; color: #666;">Sito web</td><td style="padding: 8px 0;">${website}</td></tr>` : ''}
      ${application.annual_clients ? `<tr><td style="padding: 8px 0; color: #666;">Clienti annui</td><td style="padding: 8px 0;">${application.annual_clients}</td></tr>` : ''}
    </table>

    ${description ? `
    <h3 style="margin-top: 24px; margin-bottom: 8px; font-size: 14px; text-transform: uppercase; letter-spacing: 0.1em; color: #666;">Messaggio</h3>
    <p style="line-height: 1.6; background: #FAF7F2; padding: 16px; border-left: 3px solid #1a2744;">${description}</p>
    ` : ''}

    <div style="margin-top: 40px; display: flex; gap: 16px;">
      <a href="${approveUrl}" style="display: inline-block; background: #2d6a4f; color: white; text-decoration: none; padding: 14px 32px; font-family: Georgia, serif; font-size: 16px; letter-spacing: 0.1em; margin-right: 16px;">ACCETTA</a>
      <a href="${rejectUrl}" style="display: inline-block; background: #c0392b; color: white; text-decoration: none; padding: 14px 32px; font-family: Georgia, serif; font-size: 16px; letter-spacing: 0.1em;">NON ACCETTA</a>
    </div>

    <p style="margin-top: 32px; font-size: 12px; color: #999;">ID candidatura: ${application.id}</p>
  </div>
</body>
</html>
`

  const { error: emailError } = await resend.emails.send({
    from: 'Trust the Locals <noreply@etailup.com>',
    to: process.env.OWNER_EMAIL!,
    subject: `Nuova candidatura ${formLabel}: ${applicantName}`,
    html: emailHtml,
  })

  if (emailError) {
    console.error('Resend error', emailError)
    // Don't fail the request — application is saved, email is secondary
  }

  return res.status(200).json({ success: true })
}
