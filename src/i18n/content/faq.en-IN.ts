import type { FaqItem } from '../../data/faq';
import { faqsEnUS, privacyFaqsEnUS } from './faq.en-US';
import { toBritishEnglish } from './englishVariants';

const homeIndiaOverrides: Record<string, string> = {
  'Can I redact things other than faces?':
    'Yes. You can cover anything visible in an image: faces, names, email addresses, phone numbers, card numbers, Aadhaar numbers, PANs, GSTINs, UPI IDs, addresses, QR codes, barcodes and more. Smart detection automatically suggests text that looks like emails, card numbers, phone numbers, government IDs, addresses and dates. Faces, QR codes, barcodes and logos still need a manual box.',
};

const privacyIndiaOverrides: Record<string, string> = {
  'How does smart detection work?':
    'It runs Tesseract OCR in a Web Worker inside your browser, then applies pattern checks: emails, Luhn-valid card numbers, SSNs, Aadhaar numbers, PANs, GSTINs, IBANs, phone numbers, IP addresses, dates, address keywords and likely names. Every finding is a suggestion you can include or exclude. OCR is best-effort, so review the boxes and use Verify before sharing.',
  'Are my images really never uploaded?':
    'Correct. The image is read by your browser and drawn to a canvas inside this tab. There is no upload endpoint anywhere in the site, so the file is never transmitted, stored or logged. That keeps the data flow small by design, which is also useful if you are working under India’s DPDP Act, 2023 or a company policy that restricts where personal data may go.',
};

function applyOverrides(items: FaqItem[], overrides: Record<string, string>): FaqItem[] {
  return items.map((item) =>
    overrides[item.question] ? { ...item, answer: overrides[item.question] } : item,
  );
}

export const faqsEnIN: FaqItem[] = applyOverrides(
  toBritishEnglish(faqsEnUS),
  homeIndiaOverrides,
);

export const privacyFaqsEnIN: FaqItem[] = applyOverrides(
  toBritishEnglish(privacyFaqsEnUS),
  privacyIndiaOverrides,
);
