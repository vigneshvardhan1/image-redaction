import type { Locale } from '../config';
import type { FaqItem } from '../../data/faq';
import { faqsEnUS, privacyFaqsEnUS } from './faq.en-US';
import { faqsEnGB, privacyFaqsEnGB } from './faq.en-GB';
import { faqsEnIN, privacyFaqsEnIN } from './faq.en-IN';
import { faqsDeDE, privacyFaqsDeDE } from './faq.de-DE';
import { faqsFrFR, privacyFaqsFrFR } from './faq.fr-FR';

interface LocalizedFaq {
  home: FaqItem[];
  privacy: FaqItem[];
}

export const localizedFaqs: Record<Locale, LocalizedFaq> = {
  'en-US': { home: faqsEnUS, privacy: privacyFaqsEnUS },
  'en-GB': { home: faqsEnGB, privacy: privacyFaqsEnGB },
  'en-IN': { home: faqsEnIN, privacy: privacyFaqsEnIN },
  'de-DE': { home: faqsDeDE, privacy: privacyFaqsDeDE },
  'fr-FR': { home: faqsFrFR, privacy: privacyFaqsFrFR },
};

export function getHomeFaqs(locale: Locale): FaqItem[] {
  return localizedFaqs[locale].home;
}

export function getPrivacyFaqs(locale: Locale): FaqItem[] {
  return localizedFaqs[locale].privacy;
}
