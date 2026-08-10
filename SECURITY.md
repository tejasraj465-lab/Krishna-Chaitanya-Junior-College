# Security Guide — Krishna Chaitanya Junior College Website

This document describes what is implemented in this repository and what still depends on hosting/platform configuration.

**Important:** No website can be claimed as "100% unhackable." These measures reduce common attack surface and misconfiguration risk.

## Implemented in this repository

### Frontend
- No API keys, database credentials, or private tokens in client code
- No `VITE_*` secret exposure pattern
- No `localStorage` / `sessionStorage` usage for sensitive data
- No `dangerouslySetInnerHTML`
- AI chat renders assistant text through React (auto-escaped)
- AI navigation uses allowlisted section IDs and internal paths only
- Production client bundles disable source maps (`vite.config.ts`)
- Form inputs sanitized and validated client-side (names, phone numbers, length limits)
- Duplicate submission protection on admission and campus visit forms
- External links opened with `noopener,noreferrer` where applicable

### Forms
- Admission and campus visit forms validate:
  - Name format and length
  - Indian mobile number format (10 digits, starts 6–9)
  - Campus selection against known campus list
- User input stripped of control characters before WhatsApp handoff
- Forms do **not** POST to a backend; they open WhatsApp with encoded text

### API (`/api/ai-guide`, `/api/health`)
- Server-side request validation and message length limits
- Rate limiting (30 requests/minute per IP; in-memory, per instance)
- Safe generic error responses (no stack traces returned to clients)
- JSON body size limit (32 KB on Express dev/prod server)
- Gemini API key read only from server environment variables

### Security headers
- Express server applies CSP, HSTS (production), `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`, `X-Content-Type-Options`
- `vercel.json` applies equivalent headers for static/Vercel deployment

### Secrets & source control
- `.gitignore` excludes `.env*`, keys, and `.vercel`
- `.env.example` contains placeholders only

## Vercel deployment checklist

1. Set `GEMINI_API_KEY` in **Vercel → Project Settings → Environment Variables** (Production / Preview separately if desired).
2. Do **not** add `GEMINI_API_KEY` as a `VITE_` variable.
3. Ensure the custom domain uses HTTPS (Vercel provides this by default).
4. After deployment, verify headers with browser DevTools → Network → document response headers.
5. Test AI chat, fonts, ImageKit images, and WhatsApp CTAs after CSP deployment.

## Not implemented (requires additional backend/platform work)

These items are **not** fully solved by frontend-only changes:

| Area | Status |
|------|--------|
| CAPTCHA / Cloudflare Turnstile | Not implemented — recommended if forms gain a backend |
| Distributed rate limiting | In-memory only; use Vercel KV / Upstash Redis for multi-instance limits |
| Server-side form persistence | Forms currently redirect to WhatsApp only |
| Database / SQL injection protections | No database in this project |
| Admin authentication | No admin panel exists |
| File uploads | No upload functionality exists |
| CSRF tokens | Not required for current read-only public API + WhatsApp forms |
| WAF / bot management | Configure at Vercel / Cloudflare edge if needed |
| Security logging / alerting | Console logging only; use Vercel observability or external SIEM |

## Dependency review

Run before each production release:

```bash
npm audit
npm run typecheck
npm run build
```

Review `npm audit` results manually. Do not force major dependency upgrades without regression testing.

## Reporting issues

If you discover a security issue, contact the project maintainer privately rather than opening a public issue with exploit details.
