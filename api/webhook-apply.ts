import type { VercelRequest, VercelResponse } from '@vercel/node';

const DEFAULT_TARGET =
  'https://automation.smarteer.it/webhook-test/5b125308-0ae6-4192-92eb-02947b761400/';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Allow', 'GET, POST, OPTIONS');
    return res.status(204).end();
  }

  if (req.method === 'GET') {
    const rawTargetUrl = process.env.AUTOMATION_WEBHOOK_URL_APPLY || DEFAULT_TARGET;
    const targetUrl =
      rawTargetUrl.includes('automation.smarteer.it/webhook-test/') && !rawTargetUrl.endsWith('/')
        ? `${rawTargetUrl}/`
        : rawTargetUrl;

    return res.status(200).json({
      ok: true,
      route: '/api/webhook-apply',
      targetUrl,
      note:
        'If this is a Smarteer *test* webhook, it may return 404 unless the workflow is executed/armed in Smarteer before testing.',
    });
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'GET, POST, OPTIONS');
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

    const contentType = upstream.headers.get('content-type') || '';
    const text = await upstream.text();

    res.status(upstream.status);
    if (contentType) res.setHeader('Content-Type', contentType);
    return res.send(text || 'ok');
  } catch (error) {
    console.error('Apply webhook proxy failed', error);
    return res.status(502).json({ error: 'Apply webhook proxy failed' });
  }
}
