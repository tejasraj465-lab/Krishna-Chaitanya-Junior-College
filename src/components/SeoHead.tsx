import React, { useEffect } from 'react';
import { COLLEGE_INFO, FAQ_LIST } from '../data/collegeData';

interface SeoHeadProps {
  title?: string;
  description?: string;
}

export const SeoHead: React.FC<SeoHeadProps> = ({
  title,
  description,
}) => {
  useEffect(() => {
    document.title = title || `${COLLEGE_INFO.name} | India's Rank 1 Junior College for IIT-JEE, NEET & Intermediate`;

    const metaDescription = document.querySelector('meta[name="description"]');
    const metaContent = description || `${COLLEGE_INFO.name} - Top Junior College offering 2-Year Intermediate (MPC, BiPC, MEC, CEC) with integrated IIT-JEE Main/Adv, NEET, CA-Foundation & Civil Services coaching. 28+ years of excellence.`;
    if (metaDescription) {
      metaDescription.setAttribute('content', metaContent);
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = metaContent;
      document.head.appendChild(meta);
    }

    document.getElementById('schema-educational-org')?.remove();
    document.getElementById('schema-faq')?.remove();

    const orgSchemaScript = document.createElement('script');
    orgSchemaScript.type = 'application/ld+json';
    orgSchemaScript.id = 'schema-educational-org';
    orgSchemaScript.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'EducationalOrganization',
      name: COLLEGE_INFO.name,
      alternateName: 'Krishna Chaitanya Junior College (KCJC)',
      description: COLLEGE_INFO.taglineSecondary,
      url: window.location.origin,
      logo: `${window.location.origin}/logo.png`,
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

    // Add FAQ Schema
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
    document.head.appendChild(faqSchemaScript);

    return () => {
      document.getElementById('schema-educational-org')?.remove();
      document.getElementById('schema-faq')?.remove();
    };
  }, [title, description]);

  return null;
};
