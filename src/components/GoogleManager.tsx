import { useEffect } from 'react';

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

function upsertMeta(name: string, content: string) {
  let element = document.head.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute('name', name);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

const GTM_ID_PATTERN = /^GTM-[A-Z0-9]+$/i;

/** Google Search Console verification + Google Tag Manager (set VITE_GTM_ID / VITE_GOOGLE_SITE_VERIFICATION). */
export const GoogleManager: React.FC = () => {
  useEffect(() => {
    const verification = import.meta.env.VITE_GOOGLE_SITE_VERIFICATION?.trim();
    if (verification) {
      upsertMeta('google-site-verification', verification);
    }

    const gtmId = import.meta.env.VITE_GTM_ID?.trim();
    if (!gtmId || !GTM_ID_PATTERN.test(gtmId)) return;
    if (document.getElementById('kcjc-gtm')) return;

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' });

    const script = document.createElement('script');
    script.id = 'kcjc-gtm';
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(gtmId)}`;
    document.head.appendChild(script);
  }, []);

  return null;
};
