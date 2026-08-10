import { applySecurityHeaders } from '../server/securityHeaders';

type ApiRequest = { method?: string };
type ApiResponse = {
  status: (code: number) => ApiResponse;
  json: (body: unknown) => void;
  setHeader: (name: string, value: string) => void;
};

export default function handler(req: ApiRequest, res: ApiResponse) {
  applySecurityHeaders((name, value) => res.setHeader(name, value));

  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed.' });
    return;
  }

  res.status(200).json({ status: 'ok', college: 'Krishna Chaitanya Junior College' });
}
