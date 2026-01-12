import type { VercelRequest, VercelResponse } from '@vercel/node';

const DEFAULT_TARGET =
  'https://automation.smarteer.it/webhook/5b125308-0ae6-4192-92eb-02947b761400';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'GET') {
    const rawTargetUrl =
      process.env.AUTOMATION_WEBHOOK_URL ||
      process.env.AUTOMATION_WEBHOOK_URL_APPLY ||
      DEFAULT_TARGET;
    const targetUrl =
      rawTargetUrl.includes('automation.smarteer.it/webhook-test/') && !rawTargetUrl.endsWith('/')
        ? `${rawTargetUrl}/`
        : rawTargetUrl;

    return res.status(200).json({
      ok: true,
      route: '/api/webhook',
      targetUrl,
      note:
        'If this is a Smarteer *test* webhook, it may return 404 unless the workflow is executed/armed in Smarteer before testing.',
    });
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const rawTargetUrl =
    process.env.AUTOMATION_WEBHOOK_URL ||
    process.env.AUTOMATION_WEBHOOK_URL_APPLY ||
    DEFAULT_TARGET;
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
    console.error('Webhook proxy failed', error);
    return res.status(502).json({ error: 'Webhook proxy failed' });
  }
}
