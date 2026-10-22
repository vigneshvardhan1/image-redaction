import type { Guide, GuideBlock } from '../../data/guides';
import { guidesEnGB } from './guides.en-GB';

/** Replace the blocks of a guide while keeping the rest of its shape. */
function withBlocks(guide: Guide, blocks: GuideBlock[]): Guide {
  return { ...guide, blocks };
}

function bySlug(slug: string): Guide {
  const guide = guidesEnGB.find((item) => item.slug === slug);
  if (!guide) throw new Error(`Unknown guide: ${slug}`);
  return guide;
}

const idCard = bySlug('redact-an-id-card');

const idCardIndia: Guide = withBlocks(
  {
    ...idCard,
    title: 'How to redact an Aadhaar, PAN or passport before sharing a photo',
    description:
      'A photo of an Aadhaar, PAN, passport or driving licence is a package of identity data. Here is what to cover, what to crop, and what to ask before you send a copy.',
    intro:
      'Aadhaar, PAN, passport, driving licence — every one of them is designed to be read by machines and trusted by humans. That is exactly why a photo of one is so valuable to the wrong person.',
  },
  [
    {
      type: 'callout',
      title: 'The masked Aadhaar already exists',
      tone: 'note',
      text: 'UIDAI publishes a masked Aadhaar format that hides the first eight digits, and the Income Tax Department issues a masked PAN that shows only the last four characters. Use those instead of a full photo whenever a service accepts them — the fewer digits you share, the less there is to reuse.',
    },
    ...idCard.blocks,
  ],
);

const receipt = bySlug('redact-a-receipt');

const receiptIndia: Guide = withBlocks(
  {
    ...receipt,
    description:
      'A receipt can carry a GSTIN, a UPI reference, an order number, and the last digits of a card. Cover those before the photo reaches a support inbox or a group chat.',
    intro:
      'Receipts are shared constantly — for reimbursements, warranty claims, and expense reports. In India they often carry a GSTIN, a UPI transaction reference, and a support phone number alongside the payment details.',
  },
  [
    {
      type: 'callout',
      title: 'GSTIN and UPI references count',
      tone: 'note',
      text: 'A GSTIN ties a receipt to a registered business and its address. A UPI reference number, an order ID, or a merchant transaction ID can be enough to trace or dispute a payment. Treat both as identifiers, not decoration.',
    },
    ...receipt.blocks,
  ],
);

export const guidesEnIN: Guide[] = guidesEnGB.map((guide) => {
  if (guide.slug === 'redact-an-id-card') return idCardIndia;
  if (guide.slug === 'redact-a-receipt') return receiptIndia;
  return guide;
});
