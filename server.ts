import express from 'express';
import path from 'path';
import 'dotenv/config';
import { handleAiGuideRequest } from './server/aiGuideHandler';
import { checkRateLimit, getClientIp } from './server/rateLimit';
import { applySecurityHeaders } from './server/securityHeaders';

async function startServer() {
  const app = express();
  const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
  const isProduction = process.env.NODE_ENV === 'production';

  app.disable('x-powered-by');
  app.use(express.json({ limit: '32kb' }));

  // Security headers (including CSP) only in production — they break Vite dev/HMR.
  if (isProduction) {
    app.use((_req, res, next) => {
      applySecurityHeaders((name, value) => res.setHeader(name, value), {
        isProduction: true,
      });
      next();
    });
  }

  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', college: 'Krishna Chaitanya Junior College' });
  });

  app.post('/api/ai-guide', async (req, res) => {
    const clientIp = getClientIp(req.headers as Record<string, string | string[] | undefined>, req.ip);
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
  });

  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    const publicPath = path.join(process.cwd(), 'public');
    app.use(express.static(publicPath, { maxAge: '1d', index: false }));
    app.use(express.static(distPath, { maxAge: '1d', index: false }));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.use((err: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    if (err instanceof SyntaxError && 'body' in (err as SyntaxError & { body?: unknown })) {
      res.status(400).json({ error: 'Invalid request body.' });
      return;
    }

    console.error('Unhandled server error:', err);
    if (!res.headersSent) {
      res.status(500).json({ error: 'Internal server error.' });
    }
  });

  const host = isProduction ? '0.0.0.0' : '127.0.0.1';
  app.listen(PORT, host, () => {
    console.log(`\n==================================================`);
    console.log(`  Krishna Chaitanya Educational Institutions Server`);
    console.log(`--------------------------------------------------`);
    console.log(`  Local Browser Access: http://localhost:${PORT}`);
    console.log(`  Bound Host:           ${host}`);
    console.log(`==================================================\n`);
  });
}

startServer();
