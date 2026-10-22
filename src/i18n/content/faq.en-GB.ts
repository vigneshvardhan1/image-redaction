import type { FaqItem } from '../../data/faq';
import { faqsEnUS, privacyFaqsEnUS } from './faq.en-US';
import { toBritishEnglish } from './englishVariants';

export const faqsEnGB: FaqItem[] = toBritishEnglish(faqsEnUS);

export const privacyFaqsEnGB: FaqItem[] = toBritishEnglish(privacyFaqsEnUS);
