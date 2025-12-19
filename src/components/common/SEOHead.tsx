// src/components/common/SEOHead.tsx
import { useEffect, useMemo, memo } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  type?: string;
  canonical?: string; // ✅ اضافه شد
  noindex?: boolean;
  structuredData?: Record<string, any>;
}

const SEOHead = memo(({
  title,
  description,
  keywords,
  image = '/og-image.jpg',
  type = 'website',
  canonical, // ✅ اضافه شد
  noindex = false,
  structuredData,
}: SEOHeadProps) => {
  const { i18n } = useTranslation();
  const location = useLocation();

  // ⚡ Constants
  const SITE_NAME = 'Hamidreza Daneshsarand';
  const SITE_TITLE = 'Hamidreza Daneshsarand - Mechanical Design Engineer';
  const DEFAULT_DESCRIPTION = 'Experienced Mechanical Design Engineer specializing in SolidWorks, cost optimization, and sustainable manufacturing. Available for opportunities in Sweden.';
  const DEFAULT_KEYWORDS = 'Mechanical Engineer, SolidWorks, CAD Design, Manufacturing, Sweden, Cost Optimization, Lean Manufacturing, Six Sigma';
  const SITE_URL = 'https://hamidrezadaneshsarand.com';

  // ⚡ Memoized values
  const fullTitle = useMemo(() => 
    title ? `${title} | ${SITE_NAME}` : SITE_TITLE,
    [title]
  );

  const finalDescription = useMemo(() => 
    description || DEFAULT_DESCRIPTION,
    [description]
  );

  const finalKeywords = useMemo(() => 
    keywords || DEFAULT_KEYWORDS,
    [keywords]
  );

  // ⚡ Canonical URL: اگه canonical prop داده شده از اون استفاده کن، وگرنه از pathname
  const canonicalUrl = useMemo(() => 
    canonical ? `${SITE_URL}${canonical}` : `${SITE_URL}${location.pathname}`,
    [canonical, location.pathname]
  );

  const fullImageUrl = useMemo(() => 
    image.startsWith('http') ? image : `${SITE_URL}${image}`,
    [image]
  );

  const locale = useMemo(() => {
    const locales: Record<string, string> = {
      fa: 'fa_IR',
      sv: 'sv_SE',
      en: 'en_US',
    };
    return locales[i18n.language] || 'en_US';
  }, [i18n.language]);

  // ⚡ JSON-LD Structured Data
  const defaultStructuredData = useMemo(() => ({
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Hamidreza Daneshsarand',
    jobTitle: 'Mechanical Design Engineer',
    url: SITE_URL,
    image: fullImageUrl,
    description: finalDescription,
    knowsAbout: [
      'Mechanical Engineering',
      'SolidWorks',
      'CAD Design',
      'Manufacturing',
      'Cost Optimization',
      'Lean Manufacturing',
      'Six Sigma',
    ],
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: 'University of Tabriz',
    },
    sameAs: [
      'https://linkedin.com/in/hamidreza-daneshsarand',
      'https://github.com/hamidrezadanesh',
    ],
  }), [fullImageUrl, finalDescription]);

  const finalStructuredData = structuredData || defaultStructuredData;

  useEffect(() => {
    // ⚡ Batch DOM updates
    const updateDOM = () => {
      // Title
      document.title = fullTitle;

      // Meta tags - batch updates
      const metaUpdates = [
        { attr: 'name', name: 'description', content: finalDescription },
        { attr: 'name', name: 'keywords', content: finalKeywords },
        { attr: 'name', name: 'author', content: SITE_NAME },
        { attr: 'name', name: 'language', content: i18n.language },
        
        // Robots
        ...(noindex ? [{ attr: 'name', name: 'robots', content: 'noindex,nofollow' }] : []),
        
        // Open Graph
        { attr: 'property', name: 'og:site_name', content: SITE_NAME },
        { attr: 'property', name: 'og:title', content: fullTitle },
        { attr: 'property', name: 'og:description', content: finalDescription },
        { attr: 'property', name: 'og:type', content: type },
        { attr: 'property', name: 'og:url', content: canonicalUrl },
        { attr: 'property', name: 'og:image', content: fullImageUrl },
        { attr: 'property', name: 'og:image:width', content: '1200' },
        { attr: 'property', name: 'og:image:height', content: '630' },
        { attr: 'property', name: 'og:locale', content: locale },
        
        // Twitter Card
        { attr: 'name', name: 'twitter:card', content: 'summary_large_image' },
        { attr: 'name', name: 'twitter:title', content: fullTitle },
        { attr: 'name', name: 'twitter:description', content: finalDescription },
        { attr: 'name', name: 'twitter:image', content: fullImageUrl },
      ];

      // ⚡ Use DocumentFragment for better performance
      const fragment = document.createDocumentFragment();
      const head = document.head;

      metaUpdates.forEach(({ attr, name, content }) => {
        updateMetaTag(name, content, attr as 'name' | 'property', head, fragment);
      });

      // Canonical link
      updateCanonicalLink(canonicalUrl, head, fragment);

      // Language alternates
      updateAlternateLinks(head, fragment);

      // JSON-LD
      updateStructuredData(finalStructuredData);

      // Apply fragment
      head.appendChild(fragment);
    };

    // ⚡ Use requestAnimationFrame for smoother updates
    const rafId = requestAnimationFrame(updateDOM);

    return () => cancelAnimationFrame(rafId);
  }, [
    fullTitle,
    finalDescription,
    finalKeywords,
    canonicalUrl,
    fullImageUrl,
    i18n.language,
    type,
    locale,
    noindex,
    finalStructuredData,
  ]);

  return null;
});

SEOHead.displayName = 'SEOHead';

// ⚡ Helper functions
function updateMetaTag(
  name: string,
  content: string,
  attribute: 'name' | 'property' = 'name',
  head: HTMLHeadElement,
  fragment: DocumentFragment
) {
  let element = head.querySelector(`meta[${attribute}="${name}"]`) as HTMLMetaElement;

  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, name);
    fragment.appendChild(element);
  }

  element.setAttribute('content', content);
}

function updateCanonicalLink(url: string, head: HTMLHeadElement, fragment: DocumentFragment) {
  let link = head.querySelector('link[rel="canonical"]') as HTMLLinkElement;

  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    fragment.appendChild(link);
  }

  link.setAttribute('href', url);
}

function updateAlternateLinks(head: HTMLHeadElement, fragment: DocumentFragment) {
  const languages = [
    { code: 'en', url: 'https://hamidrezadaneshsarand.com' },
    { code: 'sv', url: 'https://hamidrezadaneshsarand.com/sv' },
    { code: 'fa', url: 'https://hamidrezadaneshsarand.com/fa' },
    { code: 'x-default', url: 'https://hamidrezadaneshsarand.com' },
  ];

  // ⚡ Remove only if changed
  const existingLinks = Array.from(head.querySelectorAll('link[rel="alternate"]'));
  existingLinks.forEach(link => link.remove());

  // ⚡ Add new links in batch
  languages.forEach(({ code, url }) => {
    const link = document.createElement('link');
    link.setAttribute('rel', 'alternate');
    link.setAttribute('hreflang', code);
    link.setAttribute('href', url);
    fragment.appendChild(link);
  });
}

function updateStructuredData(data: Record<string, any>) {
  const id = 'structured-data';
  let script = document.getElementById(id) as HTMLScriptElement;

  if (!script) {
    script = document.createElement('script');
    script.id = id;
    script.type = 'application/ld+json';
    document.head.appendChild(script);
  }

  script.textContent = JSON.stringify(data);
}

export default SEOHead;