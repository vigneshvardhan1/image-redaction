/** Shared shapes for the localized marketing content. */

export interface PageMeta {
  title: string;
  description: string;
  keywords: string[];
  ogImageAlt?: string;
}

export interface PageCta {
  eyebrow: string;
  title: string;
  copy: string;
  primary: string;
  secondary: string;
  secondaryHref?: string;
}

export interface IconCopy {
  icon: string;
  title: string;
  copy: string;
}

export interface HomeContent {
  meta: PageMeta;
  useCasesHead: {
    eyebrow: string;
    title: string;
    copy: string;
  };
  hero: {
    badge: string;
    title: [string, string];
    lead: string;
    primaryCta: string;
    secondaryCta: string;
    proof: string[];
  };
  facts: IconCopy[];
  proof: {
    eyebrow: string;
    title: string;
    copy: string;
    points: IconCopy[];
    cta: string;
    sampleName: string;
  };
  useCases: Array<{
    title: string;
    copy: string;
    alt: string;
    sample: string;
    sampleName: string;
    icon: string;
    badge: string;
  }>;
  detection: {
    eyebrow: string;
    title: string;
    copy: string;
    points: string[];
    primaryCta: string;
    secondaryCta: string;
    footnote: string;
  };
  styles: {
    eyebrow: string;
    title: string;
    copy: string;
    cta: string;
  };
  privacy: {
    eyebrow: string;
    title: string;
    copy: string;
    cta: string;
    points: IconCopy[];
  };
  compare: {
    eyebrow: string;
    title: string;
    copy: string;
  };
  how: {
    eyebrow: string;
    title: string;
    copy: string;
    steps: Array<{ number: string; title: string; copy: string; icon: string }>;
    cta: string;
  };
  guide: {
    eyebrow: string;
    title: string;
    lead: string;
    intro: string;
    sections: Array<{
      id: string;
      navLabel: string;
      title: string;
      paragraphs: string[];
      bullets?: string[];
    }>;
    principles: string[];
    checks: string[];
    cta: string;
    relatedLinks: Array<{ label: string; slug: string }>;
    closing: string;
  };
  guides: {
    eyebrow: string;
    title: string;
    copy: string;
    cta: string;
  };
  faq: {
    eyebrow: string;
    title: string;
    copy: string;
    ask: string;
  };
  cta: PageCta;
}

export interface FeaturesContent {
  meta: PageMeta;
  hero: {
    eyebrow: string;
    title: string;
    lead: string;
    primaryCta: string;
    secondaryCta: string;
  };
  features: IconCopy[];
  detection: {
    eyebrow: string;
    title: string;
    copy: string;
    cards: Array<{ title: string; copy: string }>;
    cta: string;
  };
  styles: {
    eyebrow: string;
    title: string;
    copy: string;
  };
  review: {
    eyebrow: string;
    title: string;
    copy: string;
    points: IconCopy[];
    panel: {
      title: string;
      badge: string;
      okTitle: string;
      okCopy: string;
      checks: string[];
      matches: string;
      footnote: string;
    };
    cta: string;
  };
  delivery: {
    eyebrow: string;
    title: string;
    copy: string;
    points: IconCopy[];
    panel: {
      title: string;
      badge: string;
      quality: string;
      qualityValue: string;
      qualityNote: string;
      edge: string;
      edgeValue: string;
      edgeNote: string;
      estimate: string;
      estimateValue: string;
      estimateNote: string;
    };
    cta: string;
  };
  proof: {
    eyebrow: string;
    title: string;
    copy: string;
    primaryCta: string;
    secondaryCta: string;
  };
  shortcuts: {
    eyebrow: string;
    title: string;
    copy: string;
    points: string[];
    panelTitle: string;
    list: Array<{ keys: string; action: string }>;
  };
  limits: {
    eyebrow: string;
    title: string;
    copy: string;
    items: Array<{ title: string; copy: string; badge: string }>;
    footnote: string;
  };
  cta: PageCta;
}

export interface GuidesIndexContent {
  meta: PageMeta;
  hero: {
    eyebrow: string;
    title: string;
    lead: string;
    primaryCta: string;
    secondaryCta: string;
  };
  latestLabel: string;
  readGuide: string;
  allGuidesEyebrow: string;
  allGuidesTitle: string;
  allGuidesCopy: string;
  rule: {
    title: string;
    copy: string;
    questions: Array<{ question: string; copy: string }>;
  };
  cta: PageCta;
}

export interface AboutContent {
  meta: PageMeta;
  hero: {
    eyebrow: string;
    title: string;
    lead: string;
    primaryCta: string;
    secondaryCta: string;
  };
  stats: Array<{ value: string; label: string }>;
  why: {
    eyebrow: string;
    title: string;
    paragraphs: string[];
    emphasis: string;
  };
  principles: {
    eyebrow: string;
    title: string;
    copy: string;
    items: IconCopy[];
  };
  how: {
    eyebrow: string;
    title: string;
    copy: string;
    cta: string;
    steps: Array<{ number: string; title: string; copy: string; icon: string }>;
  };
  stack: {
    eyebrow: string;
    title: string;
    copy: string;
    note: string;
    items: Array<{ label: string; value: string }>;
  };
  limits: {
    eyebrow: string;
    title: string;
    items: Array<{ title: string; copy: string }>;
    footnote: string;
  };
  cta: PageCta;
}

export interface ContactContent {
  meta: PageMeta;
  hero: {
    eyebrow: string;
    title: string;
    lead: string;
    primaryCta: string;
    secondaryCta: string;
  };
  channels: IconCopy[];
  form: {
    eyebrow: string;
    title: string;
    copy: string;
    notes: string[];
    fallback: string;
    name: string;
    namePlaceholder: string;
    email: string;
    emailRequired: string;
    emailPlaceholder: string;
    topic: string;
    topics: string[];
    message: string;
    messageRequired: string;
    messagePlaceholder: string;
    privacyNote: string;
    submit: string;
    opening: string;
    sentFrom: string;
    requiredError: string;
  };
  before: {
    eyebrow: string;
    title: string;
    copy: string;
    items: IconCopy[];
  };
  answers: {
    eyebrow: string;
    title: string;
    copy: string;
    cta: string;
    links: Array<{ title: string; copy: string; href: string; icon: string }>;
  };
  copy: {
    button: string;
    copied: string;
    failed: string;
    emailLabel: string;
  };
}

export interface PrivacyContent {
  meta: PageMeta;
  hero: {
    eyebrow: string;
    title: string;
    lead: string;
    primaryCta: string;
    secondaryCta: string;
  };
  policyNotice: string;
  badges: string[];
  flow: {
    eyebrow: string;
    title: string;
    copy: string;
    localTitle: string;
    localBadge: string;
    steps: IconCopy[];
    noServerTitle: string;
    noServerCopy: string;
    requestLabel: string;
    requestText: string;
    requestResult: string;
    requestNote: string;
  };
  network: {
    eyebrow: string;
    title: string;
    copy: string;
    columns: { request: string; when: string; contains: string };
    rows: Array<{ request: string; when: string; contains: string; never?: boolean }>;
    whenLabel: string;
    noteTitle: string;
    noteCopy: string;
  };
  verify: {
    eyebrow: string;
    title: string;
    copy: string;
    cta: string;
    steps: string[];
  };
  cards: Array<{ icon: string; title: string; copy: string }>;
  faq: {
    eyebrow: string;
    title: string;
    copy: string;
  };
  cta: PageCta;
}
