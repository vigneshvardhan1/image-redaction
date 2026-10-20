export type GuideBlock =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'h3'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'steps'; items: { title: string; text: string }[] }
  | { type: 'callout'; title: string; text: string; tone?: 'note' | 'warning' }
  | { type: 'quote'; text: string };

export interface Guide {
  slug: string;
  title: string;
  description: string;
  category: string;
  readingTime: string;
  date: string;
  dateISO: string;
  cover: string;
  coverAlt: string;
  coverPosition?: string;
  intro: string;
  blocks: GuideBlock[];
  takeaways: string[];
}

export const guides: Guide[] = [
  {
    slug: 'how-to-redact-a-screenshot',
    title: 'How to redact a screenshot without missing anything',
    description:
      'One overlooked detail in the corner of a screenshot can undo a careful redaction. Use this repeatable pass to catch the bits people usually miss.',
    category: 'Screenshots',
    readingTime: '7 min read',
    date: 'Oct 16, 2026',
    dateISO: '2026-10-16',
    cover: '/samples/chat-redacted.svg',
    coverAlt: 'A chat screenshot with black bars covering a name, email, phone number, address, and card details.',
    intro:
      'Most redaction mistakes are not caused by the black box. They are caused by everything around it — the name in the header, the email in a notification, the order number under the barcode.',
    blocks: [
      {
        type: 'p',
        text: 'A screenshot is a recording of a whole interface, not just the part you meant to capture. The safe approach is to treat the entire frame as untrusted until you have looked at it deliberately, one region at a time.',
      },
      {
        type: 'h2',
        text: 'Start with the whole frame, not the obvious secret',
      },
      {
        type: 'p',
        text: 'Before you draw a single box, scan the image in a Z shape: top-left to top-right, down, then back across. The thing you noticed first is rarely the only thing worth hiding.',
      },
      {
        type: 'ul',
        items: [
          'Display names, usernames, handles, avatars, and profile photos.',
          'Email addresses, phone numbers, and account IDs inside message bubbles.',
          'Addresses, delivery instructions, and dates of birth.',
          'Card numbers, expiry dates, CVVs, and bank names.',
          'Browser tabs, bookmarks, and the URL bar.',
          'Notification banners and message previews.',
          'File names, window titles, and app sidebars.',
          'Barcodes, QR codes, order numbers, and invoice numbers.',
        ],
      },
      {
        type: 'p',
        text: 'When you can, screenshot the app window alone instead of the whole desktop. Cropping is the most reliable redaction there is: fewer pixels means fewer chances to miss something.',
      },
      {
        type: 'h2',
        text: 'Cover identities, not just faces',
      },
      {
        type: 'p',
        text: 'A face is not the only identifier. An email address can be enough to target someone. A card ending and an expiry date can support a fraudulent payment. An order number plus a postcode can unlock a support account. Think in combinations: which two details together would let a stranger do something?',
      },
      {
        type: 'h2',
        text: 'Use ink for anything that matters',
      },
      {
        type: 'p',
        text: 'Ink black is an opaque fill. It leaves no recoverable pixels underneath. Blur and pixelation are useful for context, but they can sometimes be partially reversed, especially when the text is large or the effect is light. For IDs, payment details, addresses, and account access, reach for ink first.',
      },
      {
        type: 'h2',
        text: 'Do a verification pass',
      },
      {
        type: 'p',
        text: 'The editor’s Verify button renders your redacted image and runs OCR on the flattened result. It looks for text that still matches an email, card, phone, ID, address, or date pattern. If something comes back, add another box and verify again. The check is best-effort, not a guarantee — a final human look still matters.',
      },
      {
        type: 'steps',
        items: [
          {
            title: 'Load the image',
            text: 'Drop it, paste it, or start with a sample. The file is decoded by your browser.',
          },
          {
            title: 'Run Smart detect',
            text: 'OCR suggests lines that look sensitive. Click any suggestion to exclude it. Use All text if you would rather cover every line.',
          },
          {
            title: 'Fix the edges',
            text: 'Drag boxes over anything the scan missed. Use ink for identifiers, and crop if a large area is private.',
          },
          {
            title: 'Verify, then export',
            text: 'Re-scan the flattened image, review the preview once more, then download a metadata-free PNG, JPG, or WebP.',
          },
        ],
      },
      {
        type: 'callout',
        title: 'Blur is not a promise',
        tone: 'warning',
        text: 'Research tools can sometimes recover lightly blurred or pixelated text. For anything that can identify or charge a person, use an opaque box. Save the soft effects for backgrounds and casual context.',
      },
      {
        type: 'h2',
        text: 'A 20-second final check',
      },
      {
        type: 'ul',
        items: [
          'Squint at the preview. Does any text peek out from behind a box?',
          'Check all four corners, not only the centre of the image.',
          'Open the exported file at full size before you send it.',
          'Ask whether the recipient needs the whole image. A crop is safer than a redaction.',
        ],
      },
      {
        type: 'quote',
        text: 'The safest screenshot is the one with less in it. Redact what you must, crop what you can, and send the smallest version that still does the job.',
      },
    ],
    takeaways: [
      'Scan the whole frame, including headers, tabs, and notifications.',
      'Use ink black for identifiers and payment details.',
      'Verify the flattened image and check the export at full size.',
    ],
  },
  {
    slug: 'blur-vs-pixelate-vs-black-box',
    title: 'Blur vs pixelate vs black box: which redaction is actually safe?',
    description:
      'Blur feels private, but it is not a guarantee. Here is how the four redaction styles compare, and when each one is appropriate.',
    category: 'Choosing a style',
    readingTime: '6 min read',
    date: 'Oct 9, 2026',
    dateISO: '2026-10-09',
    cover: '/samples/id-redacted.svg',
    coverAlt: 'A sample student ID card with black bars covering the photo, name, date of birth, ID number, address, and barcode.',
    intro:
      'Every redaction style changes the pixels. Only one of them reliably removes the information those pixels contain.',
    blocks: [
      {
        type: 'callout',
        title: 'The short answer',
        tone: 'note',
        text: 'Use ink black or a crop for anything that identifies a person, an account, or a payment method. Blur and pixelation are for context you do not mind losing — never for secrets.',
      },
      {
        type: 'p',
        text: 'The right style depends on the risk. A blurred face in the background of a holiday photo is a different problem from a blurred card number on an invoice. Treating them the same is how people end up sharing more than they intended.',
      },
      {
        type: 'h2',
        text: 'The risk in one paragraph',
      },
      {
        type: 'p',
        text: 'Blurring and pixelation reduce detail, but they do not erase it. Researchers have repeatedly shown that low-resolution images, lightly blurred text, and pixelated faces can be partially reconstructed with the right model or enough guesses. The result does not have to be perfect to be harmful. A partial card number, a recognisable face, or a short email address can still be used.',
      },
      {
        type: 'h2',
        text: 'Ink black',
      },
      {
        type: 'p',
        text: 'Ink draws a solid, opaque shape over the original pixels. There is no gradient to reverse and no pattern to analyse. It is the default in this editor for a reason. The one thing to watch is coverage: make the box slightly larger than the text, and zoom in to confirm no ascender or punctuation mark is left outside.',
      },
      {
        type: 'h2',
        text: 'Pixelate',
      },
      {
        type: 'p',
        text: 'Pixelation replaces an area with large colour blocks. It looks decisive, but the blocks are averages of the original pixels. With a small block count or a short piece of text, the shape of the letters can survive. Use it for decorative obscuring, not for an ID number or an email address.',
      },
      {
        type: 'h2',
        text: 'Blur',
      },
      {
        type: 'p',
        text: 'Blur is the most natural-looking option and the weakest guarantee. A light Gaussian blur preserves the layout and often the word shapes. Faces can remain recognisable at surprisingly strong blur radii. It is a reasonable choice for a face in a crowd when the image will stay small and the person is not the subject — and a poor choice for a passport photo or a bank statement.',
      },
      {
        type: 'h2',
        text: 'Emoji sticker',
      },
      {
        type: 'p',
        text: 'The emoji style in this editor is not a floating transparent character. It draws an opaque white plate first, then the emoji on top. That means the area is covered even if the emoji is smaller than the box. It is a friendly look for a face in a group chat, provided the box fully covers the face and any name nearby.',
      },
      {
        type: 'h2',
        text: 'The style that always wins: crop',
      },
      {
        type: 'p',
        text: 'If a detail is not needed for the point you are making, remove it from the frame entirely. Crop the screenshot to the message, the total, or the one row that matters. A crop cannot be unblurred. It also makes the image smaller and easier to read.',
      },
      {
        type: 'h2',
        text: 'A simple rule',
      },
      {
        type: 'ul',
        items: [
          'Identity, money, or account access: ink black or crop.',
          'A face in a public scene: blur only when the face is not the subject and the image will stay small; otherwise ink.',
          'Casual visual noise: pixelate or emoji.',
          'Anything going on a public profile: crop first, verify second, post last.',
        ],
      },
      {
        type: 'p',
        text: 'A redaction can look convincing in an editor at 40% zoom. Check the exported file at 100%. If you can read it, assume someone else can too.',
      },
    ],
    takeaways: [
      'Ink and cropping are the only styles that reliably remove information.',
      'Blur and pixelation can leak text and faces.',
      'Judge the final export at full size, not the editor preview.',
    ],
  },
  {
    slug: 'redact-a-receipt',
    title: 'How to redact a receipt before you expense it',
    description:
      'Receipts carry more identity data than most people expect. Cover these fields before the image reaches a chat, an expense tool, or a support inbox.',
    category: 'Receipts & banking',
    readingTime: '5 min read',
    date: 'Oct 1, 2026',
    dateISO: '2026-10-01',
    cover: '/samples/receipt-redacted.svg',
    coverAlt: 'A paper receipt with black bars covering the order number, payment details, billing email, shipping address, tax ID, and support phone number.',
    intro:
      'A receipt proves a purchase. It does not have to prove who you are, where you live, or which card you used. Yet most receipts print all of that by default.',
    blocks: [
      {
        type: 'p',
        text: 'Expense reports, warranty claims, and support tickets all ask for a receipt image. Before you attach one, decide which fields the recipient actually needs. Usually it is the merchant, the date, the line items, and the total. Everything else is optional.',
      },
      {
        type: 'h2',
        text: 'The fields that matter',
      },
      {
        type: 'ul',
        items: [
          'Your full name, billing email, and shipping address.',
          'Card brand, last four digits, expiry date, and any printed CVV.',
          'Order, invoice, and customer numbers.',
          'Tax IDs such as a GSTIN, VAT number, or business registration number.',
          'Barcodes and QR codes, which often encode the order and customer record.',
          'Support phone numbers and staff names.',
          'Signatures and handwritten notes.',
        ],
      },
      {
        type: 'p',
        text: 'If the expense tool only needs the merchant, date, total, and line items, crop to those. A receipt does not need a name and address to prove a purchase.',
      },
      {
        type: 'h2',
        text: 'Redact in this order',
      },
      {
        type: 'steps',
        items: [
          {
            title: 'Crop out the margins',
            text: 'Remove anything the recipient does not need: the address block, the payment section, or the barcode strip.',
          },
          {
            title: 'Cover payment details',
            text: 'Use ink black over the card number, expiry, CVV, and bank name. If the last four digits are not needed, cover them too.',
          },
          {
            title: 'Cover identity fields',
            text: 'Name, email, phone, address, tax ID, and signature. Use one box per field so it is easy to review.',
          },
          {
            title: 'Deal with the barcode',
            text: 'Cover the barcode and QR code completely, including the quiet zone around them. A partial barcode can still be readable.',
          },
          {
            title: 'Verify and export',
            text: 'Run Verify, zoom into the result, and download a new image. The export carries no original metadata.',
          },
        ],
      },
      {
        type: 'h2',
        text: 'Do not forget the barcode',
      },
      {
        type: 'p',
        text: 'A barcode can hold an order ID, a customer number, or a loyalty account. Because it does not look like text, it is easy to leave untouched. Treat any machine-readable pattern on a receipt as sensitive by default.',
      },
      {
        type: 'h2',
        text: 'Expense tools, support tickets, and group chats',
      },
      {
        type: 'p',
        text: 'The channel changes the risk. A receipt sent to a work expense tool may be visible to an administrator. A receipt posted in a group chat may be forwarded. A support agent usually needs less than the full page. Send the smallest image that answers the question.',
      },
      {
        type: 'callout',
        title: 'If someone asks for the full receipt',
        tone: 'note',
        text: 'Ask which fields they need and why. A legitimate support or expense process can usually work with a cropped or redacted copy. You can always provide more later; you cannot unsend an image.',
      },
      {
        type: 'h2',
        text: 'Final check',
      },
      {
        type: 'ul',
        items: [
          'No card number, expiry date, or CVV is visible.',
          'Your name, email, phone, and address are covered or cropped out.',
          'The barcode and QR code are fully hidden.',
          'The order number and tax ID are covered if they are not needed.',
          'The exported file has been opened and checked at full size.',
        ],
      },
    ],
    takeaways: [
      'Crop to the merchant, date, total, and line items when you can.',
      'Cover payment details, identity fields, and barcodes with ink.',
      'Send the smallest receipt that still answers the question.',
    ],
  },
  {
    slug: 'redact-an-id-card',
    title: 'Redacting an ID card: the fields you should never share',
    description:
      'A photo of an ID is a package of identity data. Here is what to cover, what to crop, and what to ask before you send a copy.',
    category: 'IDs & documents',
    readingTime: '6 min read',
    date: 'Sep 24, 2026',
    dateISO: '2026-09-24',
    cover: '/samples/id-redacted.svg',
    coverAlt: 'A student ID card with black bars covering the photo, name, date of birth, ID number, address, barcode, and QR code.',
    intro:
      'An ID card is designed to be read by machines and trusted by humans. That is exactly why a photo of one is so valuable to the wrong person.',
    blocks: [
      {
        type: 'p',
        text: 'Verification requests are common: renting a flat, opening an account, collecting a parcel, or proving a student discount. The request is often legitimate. The default response — sending a clean photo of the whole card — does not have to be.',
      },
      {
        type: 'h2',
        text: 'Front and back both count',
      },
      {
        type: 'p',
        text: 'The back of an ID often carries a barcode, a machine-readable zone, a signature, or an address. Redacting only the front leaves a second copy of the same data. If you do not need the back, do not photograph it.',
      },
      {
        type: 'h2',
        text: 'Cover these fields',
      },
      {
        type: 'ul',
        items: [
          'The ID number. It is the key that ties the card to databases and support systems.',
          'Date of birth. A core identity factor used in account recovery.',
          'Home address. Often enough to locate a person or answer security questions.',
          'The photograph. Biometric data deserves its own protection.',
          'Barcode, QR code, or machine-readable zone. These can encode the same fields in a form that is easy to copy.',
          'Signature and any handwritten marks.',
          'Expiry, issue date, and nationality when they are not needed for the check.',
        ],
      },
      {
        type: 'p',
        text: 'Your name alone is usually not the secret. The combination is. If a form needs to match a name, keep the name visible and cover everything that turns it into an identity record.',
      },
      {
        type: 'h2',
        text: 'Crop to the minimum',
      },
      {
        type: 'p',
        text: 'Ask what the recipient actually needs. A hotel may need a name and the dates of stay. A utility company may need a name and service address. A support agent checking ownership may need only the card type and the last four digits of an account. A payslip or a utility bill is often a better fit than a full ID.',
      },
      {
        type: 'h2',
        text: 'Use ink, not blur',
      },
      {
        type: 'p',
        text: 'ID cards are high-contrast documents with large text. Blur and pixelation are especially poor fits: the format is predictable, so partial shapes are easier to reconstruct. Use opaque boxes that extend slightly beyond each field.',
      },
      {
        type: 'h2',
        text: 'Add context to the copy',
      },
      {
        type: 'p',
        text: 'If you need to write “for Acme verification, 20 October” on a copy, use your phone’s markup tool or a separate editor. This redaction tool does not add text yet. Keep the note away from the sensitive fields, and keep the original image private.',
      },
      {
        type: 'callout',
        title: 'Send once, not twice',
        tone: 'warning',
        text: 'If you send a redacted copy and then send the original “just in case”, the redaction was pointless. Decide what is needed before the first message. You can always share more later.',
      },
      {
        type: 'h2',
        text: 'Before you hit send',
      },
      {
        type: 'ul',
        items: [
          'The ID number, date of birth, address, and signature are covered.',
          'Any barcode, QR code, or machine-readable zone is fully hidden.',
          'The photo is covered if the recipient does not need it.',
          'Both sides of the card have been checked.',
          'The exported image is the only version you have shared.',
        ],
      },
    ],
    takeaways: [
      'Cover the ID number, date of birth, address, photo, and machine-readable codes.',
      'Ask what the recipient needs and crop to that.',
      'Use opaque ink, then verify and send only the redacted copy.',
    ],
  },
  {
    slug: 'work-screenshot-checklist',
    title: 'Sharing a work screenshot? Check these 12 things first',
    description:
      'Dashboards, support tickets, and analytics screens are full of names, emails, and internal numbers. A short pre-share checklist.',
    category: 'Work & support',
    readingTime: '5 min read',
    date: 'Sep 17, 2026',
    dateISO: '2026-09-17',
    cover: '/samples/dashboard-redacted.svg',
    coverAlt: 'An analytics dashboard with black bars covering the signed-in account, customer names, email addresses, and revenue figures.',
    intro:
      'A work screenshot is rarely just a chart. It usually includes a signed-in account, a customer table, a workspace name, and a browser tab — all in the margins.',
    blocks: [
      {
        type: 'p',
        text: 'Support replies, bug reports, and internal documentation all get better with a screenshot. They also get riskier. Customer data can cross a boundary it was never meant to cross, and internal numbers can leave a company network in a PNG.',
      },
      {
        type: 'h2',
        text: 'The 12-point check',
      },
      {
        type: 'ul',
        items: [
          'The browser tab title and any pinned tab names.',
          'The URL bar, including query strings and ticket IDs.',
          'The workspace or organisation name in the sidebar.',
          'The signed-in user’s name and email address.',
          'Customer names and emails in tables or panels.',
          'Revenue, MRR, contract values, or other commercial numbers.',
          'Internal project names, ticket IDs, and environment labels.',
          'Notification toasts and unread-message previews.',
          'Slack, Teams, or email channel names.',
          'Avatars and profile photos.',
          'Timestamps that reveal routines or time zones.',
          'Other windows visible behind the main app.',
        ],
      },
      {
        type: 'h2',
        text: 'Redact for the audience',
      },
      {
        type: 'p',
        text: 'A screenshot for your own team can show more than one for a public bug report. A screenshot in a customer support thread should contain only what the customer would recognise as their own data. Decide who will see the image before you decide what to hide.',
      },
      {
        type: 'h2',
        text: 'Preserve the point',
      },
      {
        type: 'p',
        text: 'Redaction is not about making the image useless. Keep the layout, the trend line, the error message, or the row you are explaining. Cover the identifiers around it. If the point is “the third row has the wrong total”, the customer name is not part of the evidence.',
      },
      {
        type: 'h2',
        text: 'A better default',
      },
      {
        type: 'steps',
        items: [
          {
            title: 'Capture the app, not the desktop',
            text: 'Use a window screenshot so other tabs and notifications stay out of frame.',
          },
          {
            title: 'Run Smart detect',
            text: 'Let the on-device scan suggest names, emails, phone numbers, and IDs. Exclude anything irrelevant.',
          },
          {
            title: 'Cover the margins',
            text: 'Check the sidebar, URL bar, account chip, and any toast. These are the most commonly missed areas.',
          },
          {
            title: 'Verify before posting',
            text: 'Re-scan the flattened image and open the export at full size. Then attach it to the ticket or thread.',
          },
          {
            title: 'Make it small enough to send',
            text: 'Long dashboard captures are heavy. Open the size panel, cap the longest edge, and check the measured file size before you attach it.',
          },
        ],
      },
      {
        type: 'callout',
        title: 'When in doubt, ask',
        tone: 'note',
        text: 'If a screenshot contains customer data and you are not sure whether it can be shared, ask the data owner first. A redaction tool can remove identifiers, but it cannot decide policy for you.',
      },
      {
        type: 'h2',
        text: 'The habit that matters',
      },
      {
        type: 'p',
        text: 'The goal is not to redact every screenshot perfectly. It is to make “what is in this frame?” a normal step before sharing. Once the habit is in place, the checklist takes less than a minute.',
      },
    ],
    takeaways: [
      'Check tabs, URL bars, sidebars, notifications, and the signed-in account.',
      'Keep the evidence and remove the identifiers around it.',
      'Verify the flattened image before it goes into a ticket or thread.',
      'Measure the export size before you attach a heavy capture.',
    ],
  },
];

export const guidesByDate = [...guides].sort((a, b) => b.dateISO.localeCompare(a.dateISO));

export function getGuide(slug: string): Guide | undefined {
  return guides.find((guide) => guide.slug === slug);
}
