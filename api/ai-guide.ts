import { handleAiGuideRequest } from '../server/aiGuideHandler';
import { checkRateLimit, getClientIp } from '../server/rateLimit';
import { applySecurityHeaders } from '../server/securityHeaders';

type ApiRequest = {
  method?: string;
  body?: unknown;
  headers?: Record<string, string | string[] | undefined>;
};

type ApiResponse = {
  status: (code: number) => ApiResponse;
  json: (body: unknown) => void;
  setHeader: (name: string, value: string) => void;
};

export default async function handler(req: ApiRequest, res: ApiResponse) {
  applySecurityHeaders((name, value) => res.setHeader(name, value));

  if (req.method === 'OPTIONS') {
    res.status(204).json({});
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed.' });
    return;
  }

  const clientIp = getClientIp(req.headers || {});
  const rateLimit = checkRateLimit(`ai-guide:${clientIp}`, 30, 60_000);

  if (!rateLimit.allowed) {
    res.setHeader('Retry-After', String(rateLimit.retryAfterSeconds || 60));
    res.status(429).json({ error: 'Too many requests. Please try again shortly.' });
    return;
  }

  try {
    const result = await handleAiGuideRequest(req.body);
    res.status(result.status).json(result.body);
  } catch (error) {
    console.error('AI guide handler error:', error);
    res.status(500).json({ error: 'Unable to process your request right now.' });
  }
}
