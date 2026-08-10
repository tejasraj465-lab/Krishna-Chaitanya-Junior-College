const CSP = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "form-action 'self' https://wa.me",
  "script-src 'self'",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com data:",
  "img-src 'self' data: blob: https://ik.imagekit.io https://images.unsplash.com https://ai.google.dev",
  "connect-src 'self' https://fonts.googleapis.com https://fonts.gstatic.com",
  "upgrade-insecure-requests",
].join('; ');

export function applySecurityHeaders(
  setHeader: (name: string, value: string) => void,
  options?: { includeCsp?: boolean; isProduction?: boolean }
): void {
  const isProduction = options?.isProduction ?? true;

  setHeader('X-Content-Type-Options', 'nosniff');
  setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  setHeader('X-Frame-Options', 'DENY');
  setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');

  // Strict CSP breaks Vite dev (HMR websockets + inline module scripts).
  if (isProduction && options?.includeCsp !== false) {
    setHeader('Content-Security-Policy', CSP);
  }

  if (isProduction) {
    setHeader('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');
  }
}

export const VERCEL_SECURITY_HEADERS = [
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()',
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  {
    key: 'Content-Security-Policy',
    value: CSP,
  },
];
