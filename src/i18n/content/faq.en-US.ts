import type { FaqItem } from '../../data/faq';
import { faqs, homeFaqs } from '../../data/faq';

/**
 * The privacy page shows a focused selection of the full FAQ. The indexes are
 * shared across locales so every translation answers the same six questions.
 */
export const privacyFaqIndexes = [0, 1, 3, 5, 8, 9];

export const faqsEnUS: FaqItem[] = homeFaqs;
export const privacyFaqsEnUS: FaqItem[] = privacyFaqIndexes.map((index) => faqs[index]);
