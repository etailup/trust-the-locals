import type { VercelRequest, VercelResponse } from '@vercel/node';

const DEFAULT_TARGET =
  'https://webhook.site/30d9b223-4693-4366-acf0-df46b48bdff8';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const rawTargetUrl = process.env.AUTOMATION_WEBHOOK_URL_APPLY || DEFAULT_TARGET;
  const targetUrl =
    rawTargetUrl.includes('automation.smarteer.it/webhook-test/') && !rawTargetUrl.endsWith('/')
      ? `${rawTargetUrl}/`
      : rawTargetUrl;

  try {
    const body =
      typeof req.body === 'string' ? req.body : JSON.stringify(req.body ?? {});

    const upstream = await fetch(targetUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body,
    });

    const text = await upstream.text();
    return res.status(upstream.status).send(text || 'ok');
  } catch (error) {
    console.error('Apply webhook proxy failed', error);
    return res.status(502).json({ error: 'Apply webhook proxy failed' });
  }
}
