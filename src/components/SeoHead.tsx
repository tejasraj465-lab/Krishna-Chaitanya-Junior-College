import React, { useEffect } from 'react';
import { COLLEGE_INFO, FAQ_LIST } from '../data/collegeData';
import { SITE_NAME, SITE_URL } from '../config/site';

interface SeoHeadProps {
  title?: string;
  description?: string;
}

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  const selector = `meta[${attr}="${key}"]`;
  let element = document.head.querySelector(selector) as HTMLMetaElement | null;
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attr, key);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

function upsertLink(rel: string, href: string, attributes: Record<string, string> = {}) {
  const extra = Object.entries(attributes)
    .map(([key, value]) => `[${key}="${value}"]`)
    .join('');
  const selector = `link[rel="${rel}"]${extra}`;
  let element = document.head.querySelector(selector) as HTMLLinkElement | null;
  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', rel);
    Object.entries(attributes).forEach(([key, value]) => element?.setAttribute(key, value));
    document.head.appendChild(element);
  }
  element.setAttribute('href', href);
}

export const SeoHead: React.FC<SeoHeadProps> = ({
  title,
  description,
}) => {
  useEffect(() => {
    const pageTitle = title || `${SITE_NAME} | India's Rank 1 Junior College for IIT-JEE, NEET & Intermediate`;
    const metaContent = description || `${COLLEGE_INFO.name} - Top Junior College offering 2-Year Intermediate (MPC, BiPC, MEC, CEC) with integrated IIT-JEE Main/Adv, NEET, CA-Foundation & Civil Services coaching. 28+ years of excellence.`;
    const canonical = `${SITE_URL}${window.location.pathname === '/' ? '/' : window.location.pathname}`;
    const origin = SITE_URL || window.location.origin;

    document.title = pageTitle;

    upsertMeta('name', 'description', metaContent);
    upsertMeta('name', 'robots', 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1');
    upsertMeta('name', 'googlebot', 'index,follow');
    upsertMeta('name', 'referrer', 'strict-origin-when-cross-origin');
    upsertMeta('property', 'og:type', 'website');
    upsertMeta('property', 'og:site_name', SITE_NAME);
    upsertMeta('property', 'og:title', pageTitle);
    upsertMeta('property', 'og:description', metaContent);
    upsertMeta('property', 'og:url', canonical);
    upsertMeta('property', 'og:image', COLLEGE_INFO.logo);
    upsertMeta('name', 'twitter:card', 'summary');
    upsertMeta('name', 'twitter:title', pageTitle);
    upsertMeta('name', 'twitter:description', metaContent);

    upsertLink('canonical', canonical);
    upsertLink('sitemap', `${origin}/sitemap.xml`, { type: 'application/xml', title: 'Sitemap' });

    document.getElementById('schema-educational-org')?.remove();
    document.getElementById('schema-faq')?.remove();
    document.getElementById('schema-website')?.remove();

    const orgSchemaScript = document.createElement('script');
    orgSchemaScript.type = 'application/ld+json';
    orgSchemaScript.id = 'schema-educational-org';
    orgSchemaScript.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'EducationalOrganization',
      name: COLLEGE_INFO.name,
      alternateName: 'Krishna Chaitanya Junior College (KCJC)',
      description: COLLEGE_INFO.taglineSecondary,
      url: origin,
      logo: COLLEGE_INFO.logo,
      telephone: COLLEGE_INFO.phonePrimary,
      email: COLLEGE_INFO.email,
      address: {
        '@type': 'PostalAddress',
        streetAddress: COLLEGE_INFO.headquarters,
        addressLocality: 'Nellore',
        addressRegion: 'Andhra Pradesh',
        postalCode: '524003',
        addressCountry: 'IN'
      },
      sameAs: Object.values(COLLEGE_INFO.socialLinks),
      foundingDate: '1998'
    });

    const websiteSchema = document.createElement('script');
    websiteSchema.type = 'application/ld+json';
    websiteSchema.id = 'schema-website';
    websiteSchema.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: SITE_NAME,
      url: origin,
      inLanguage: 'en-IN',
    });

    const faqSchemaScript = document.createElement('script');
    faqSchemaScript.type = 'application/ld+json';
    faqSchemaScript.id = 'schema-faq';
    faqSchemaScript.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: FAQ_LIST.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer
        }
      }))
    });

    document.head.appendChild(orgSchemaScript);
    document.head.appendChild(websiteSchema);
    document.head.appendChild(faqSchemaScript);

    return () => {
      document.getElementById('schema-educational-org')?.remove();
      document.getElementById('schema-website')?.remove();
      document.getElementById('schema-faq')?.remove();
    };
  }, [title, description]);

  return null;
};
