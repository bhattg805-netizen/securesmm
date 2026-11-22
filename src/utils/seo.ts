// Centralized SEO Metadata Engine for SecureSMM
// Ensures clean, duplicate-free, and high-impact SEO metadata for public and private routes.

export interface SeoConfig {
  title: string;
  description: string;
  keywords?: string;
  canonicalPath?: string;
  noIndex?: boolean;
  ogType?: string;
  image?: string;
}

export const CANONICAL_SITE_URL = 'https://www.securesmm.in';
export const DEFAULT_OG_IMAGE = 'https://www.securesmm.in/favicon-512x512.png';
export const DEFAULT_KEYWORDS =
  'securesmm, secure smm, securesmm.in, secure smm panel, trusted smm panel india, safe smm provider, cheapest smm reseller panel, non drop instagram followers, genuine youtube watch time panel, telegram channel members panel, facebook growth smm, encrypted upi smm panel, bharatpe auto qr smm, main smm provider 2026, zero drop smm services';

export const PRIMARY_SEO: SeoConfig = {
  title: 'SecureSMM – #1 Trusted & Secure SMM Panel | Main SMM Provider',
  description:
    "SecureSMM is India's #1 most secure & trusted main SMM provider. Safe, non-drop Instagram followers, YouTube watch time, Telegram members & Facebook growth with encrypted UPI/QR payments and instant delivery.",
  keywords: DEFAULT_KEYWORDS,
  canonicalPath: '/',
  noIndex: false,
  ogType: 'website',
  image: DEFAULT_OG_IMAGE,
};

export const PAGE_SEO_REGISTRY: Record<string, SeoConfig> = {
  home: PRIMARY_SEO,
  services: {
    title: 'All Secure SMM Services & Wholesale Pricing | SecureSMM',
    description:
      'Explore safe, zero-drop social media marketing services with instant delivery. Buy genuine Instagram followers, YouTube watch time, Telegram members & Facebook growth on SecureSMM.',
    keywords:
      'securesmm services, safe smm services list, non drop instagram followers, youtube watch time smm, telegram members cheap, wholesale smm pricing, securesmm.in',
    canonicalPath: '/services',
    noIndex: false,
  },
  blog: {
    title: 'Safe Social Media Growth Guides & SMM Insights | SecureSMM',
    description:
      'Discover algorithm-safe social media marketing strategies, retention guides, and creator growth blueprints for Instagram, YouTube, Telegram, and Facebook on SecureSMM.',
    keywords:
      'securesmm blog, safe instagram growth 2026, youtube monetization watch time guide, telegram marketing tips, smm reseller growth blueprint',
    canonicalPath: '/blog',
    noIndex: false,
  },
  faq: {
    title: 'Frequently Asked Questions & Security Help Center | SecureSMM',
    description:
      'Find clear answers about encrypted UPI & QR deposits, non-drop refill guarantees, order speeds, API automation, and child panels on SecureSMM.',
    keywords:
      'securesmm faq, smm panel upi deposit help, non drop refill policy, secure smm account safety, bharatpe qr payment smm',
    canonicalPath: '/faq',
    noIndex: false,
  },
  'api-docs': {
    title: 'Secure SMM Reseller API v2 Documentation | SecureSMM',
    description:
      'Connect your reseller panel to SecureSMM with our encrypted, high-throughput REST API v2. Automate bulk orders, instant refills, status sync, and wallet balance checks.',
    keywords:
      'securesmm api, smm reseller api v2, automated smm integration, securesmm.in api docs, fast smm provider api',
    canonicalPath: '/api-docs',
    noIndex: false,
  },
  'child-panels': {
    title: 'Launch Your Own Branded SMM Child Panel | SecureSMM',
    description:
      'Start your automated SMM reseller business in minutes. Connect your custom domain directly to SecureSMM with SSL protection, live rate sync, and automated UPI billing.',
    keywords:
      'securesmm child panel, start smm reseller business, white label smm panel india, automated child panel hosting',
    canonicalPath: '/child-panels',
    noIndex: false,
  },
  affiliates: {
    title: 'Affiliate Partner Program – Earn Lifetime Commission | SecureSMM',
    description:
      'Earn recurring lifetime commissions by referring creators, agencies, and resellers to SecureSMM. Real-time tracking and instant wallet payouts.',
    keywords:
      'securesmm affiliate, smm panel referral program, earn lifetime commission smm',
    canonicalPath: '/affiliates',
    noIndex: false,
  },
  about: {
    title: 'About SecureSMM – Safe & Verified Main SMM Provider',
    description:
      'Learn why thousands of creators, agencies, and resellers choose SecureSMM for encrypted payments, non-drop quality, and 24/7 automated social media infrastructure.',
    keywords: 'about securesmm, trusted smm provider india, securesmm.in review',
    canonicalPath: '/about',
    noIndex: false,
  },
  contact: {
    title: '24/7 Priority Customer Support & Live Help | SecureSMM',
    description:
      'Reach the SecureSMM support team 24/7 via live AI assistant, WhatsApp, Telegram, or priority support tickets for instant order and payment help.',
    keywords: 'securesmm support, securesmm whatsapp, securesmm telegram, smm panel customer care',
    canonicalPath: '/contact',
    noIndex: false,
  },
  terms: {
    title: 'Terms of Service & Usage Policies | SecureSMM',
    description:
      'Review the official Terms of Service, refill guarantees, refund policy, and platform guidelines for using SecureSMM services safely.',
    canonicalPath: '/terms',
    noIndex: false,
  },
  privacy: {
    title: 'Privacy Policy – End-to-End Account & Data Protection | SecureSMM',
    description:
      'Read how SecureSMM protects your privacy, encrypts sessions, and ensures zero password requirements or third-party data sharing.',
    canonicalPath: '/privacy',
    noIndex: false,
  },

  // Private states: strictly blocked from search engines
  dashboard: {
    title: 'Dashboard – My Account | SecureSMM',
    description: 'Manage your social media orders, encrypted wallet balance, and support tickets on SecureSMM.',
    canonicalPath: '/dashboard',
    noIndex: true,
  },
  admin: {
    title: 'Admin Panel – Management Workspace | SecureSMM',
    description: 'SecureSMM administrative dashboard and system management.',
    canonicalPath: '/admin',
    noIndex: true,
  },
  login: {
    title: 'Sign In & Register | SecureSMM',
    description: 'Sign in or create your encrypted reseller account on SecureSMM.',
    canonicalPath: '/',
    noIndex: true,
  },
};

/**
 * Updates DOM metadata cleanly, eliminating duplicates and enforcing SEO standards.
 */
export function updateSeoMetadata(config: Partial<SeoConfig> = {}): void {
  if (typeof document === 'undefined') return;

  const title = config.title || PRIMARY_SEO.title;
  const description = config.description || PRIMARY_SEO.description;
  const canonicalPath = config.canonicalPath !== undefined ? config.canonicalPath : PRIMARY_SEO.canonicalPath;
  const noIndex = Boolean(config.noIndex);
  const ogType = config.ogType || 'website';
  const image = config.image || DEFAULT_OG_IMAGE;

  const keywords = config.keywords || PRIMARY_SEO.keywords || DEFAULT_KEYWORDS;

  // 1. Title
  document.title = title;

  // 2. Meta Keywords
  let keywordsTag = document.querySelector("meta[name='keywords']") as HTMLMetaElement | null;
  if (!keywordsTag) {
    keywordsTag = document.createElement('meta');
    keywordsTag.name = 'keywords';
    document.head.appendChild(keywordsTag);
  }
  keywordsTag.content = keywords;

  // 3. Meta Description (single source of truth)
  let descMeta = document.querySelector("meta[name='description']") as HTMLMetaElement | null;
  if (!descMeta) {
    descMeta = document.createElement('meta');
    descMeta.name = 'description';
    document.head.appendChild(descMeta);
  }
  descMeta.content = description;

  // 4. Robots Tag (index, follow vs noindex, nofollow)
  let robotsMeta = document.querySelector("meta[name='robots']") as HTMLMetaElement | null;
  if (!robotsMeta) {
    robotsMeta = document.createElement('meta');
    robotsMeta.name = 'robots';
    document.head.appendChild(robotsMeta);
  }
  robotsMeta.content = noIndex
    ? 'noindex, nofollow'
    : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';

  // 5. Canonical Link
  const fullCanonicalUrl = canonicalPath
    ? `${CANONICAL_SITE_URL}${canonicalPath.startsWith('/') ? canonicalPath : `/${canonicalPath}`}`
    : `${CANONICAL_SITE_URL}/`;

  let canonicalLink = document.querySelector("link[rel='canonical']") as HTMLLinkElement | null;
  if (!canonicalLink) {
    canonicalLink = document.createElement('link');
    canonicalLink.rel = 'canonical';
    document.head.appendChild(canonicalLink);
  }
  canonicalLink.href = fullCanonicalUrl;

  // 6. Open Graph Tags
  const setMetaProperty = (prop: string, val: string) => {
    let el = document.querySelector(`meta[property='${prop}']`) as HTMLMetaElement | null;
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute('property', prop);
      document.head.appendChild(el);
    }
    el.content = val;
  };

  setMetaProperty('og:site_name', 'SecureSMM');
  setMetaProperty('og:title', title);
  setMetaProperty('og:description', description);
  setMetaProperty('og:url', fullCanonicalUrl);
  setMetaProperty('og:type', ogType);
  setMetaProperty('og:image', image);
  setMetaProperty('og:locale', 'en_US');

  // 7. Twitter / X Card Tags
  const setMetaName = (name: string, val: string) => {
    let el = document.querySelector(`meta[name='${name}']`) as HTMLMetaElement | null;
    if (!el) {
      el = document.createElement('meta');
      el.name = name;
      document.head.appendChild(el);
    }
    el.content = val;
  };

  setMetaName('twitter:card', 'summary_large_image');
  setMetaName('twitter:title', title);
  setMetaName('twitter:description', description);
  setMetaName('twitter:image', image);
}
