import type { HomeContent } from './types';

export const homeEnUS: HomeContent = {
  meta: {
    title: 'Image & PDF Redaction Tool — Free, Private, Online | Redact',
    description:
      'Free on-device redaction software for screenshots, photos, and PDFs. Hide names, emails, card numbers, and addresses — no uploads, no account, no watermark.',
    keywords: [
      'image redaction',
      'pdf redaction',
      'redact pdf',
      'redact pdf online',
      'image redaction software',
      'image redaction tool',
      'AI image redaction software',
      'redact image',
      'redact screenshot',
      'blur sensitive information in image',
    ],
    ogImageAlt: 'Redact — a free on-device redaction tool for images and PDFs',
  },
  useCasesHead: {
    eyebrow: 'What people hide',
    title: 'Every screenshot has a small confession in it.',
    copy: 'The obvious secret is rarely the only one. Pick the kind of image you are about to share and see what usually needs covering.',
  },
  hero: {
    badge: 'Image and PDF redaction, on your device',
    title: ['Share the screenshot.', 'Not the secrets.'],
    lead: 'Redact images and PDFs in your browser: hide names, emails, card numbers, and addresses in seconds. Smart detection runs on your device, and every export leaves its metadata behind — PDF pages are flattened too.',
    primaryCta: 'Redact a file',
    secondaryCta: 'See how it works',
    proof: ['Free', 'No account', 'No uploads', 'No watermark'],
  },
  facts: [
    {
      icon: 'lock',
      title: '0 bytes uploaded',
      copy: 'No upload endpoint exists.',
    },
    {
      icon: 'shield',
      title: 'Metadata removed',
      copy: "EXIF, GPS, and PDF metadata don't travel with the export.",
    },
    {
      icon: 'zap',
      title: 'Free, no account',
      copy: 'No email, no plan, no watermark.',
    },
    {
      icon: 'wifi-off',
      title: 'Works offline',
      copy: 'Keep editing after the page loads.',
    },
  ],
  proof: {
    eyebrow: 'Proof, not promises',
    title: 'The black bar is the whole point.',
    copy: 'A redaction should be boring: opaque, flattened, and verified. There is no hidden layer to peel back in the file you download — image or PDF — whichever of the four styles you use.',
    points: [
      {
        icon: 'square',
        title: 'Flattened, not layered',
        copy: 'The export is a new image or a rebuilt PDF. No hidden layer, no editable mask, no undo in the file.',
      },
      {
        icon: 'shield-check',
        title: 'Re-scan before sharing',
        copy: 'Verify reads the flattened image and flags text that still matches a sensitive pattern.',
      },
      {
        icon: 'eye',
        title: 'Inspect it at full size',
        copy: 'Step through all four styles in the sample, then drag the handle and look for text peeking out from behind a cover.',
      },
    ],
    cta: 'Open the ID sample',
    sampleName: 'Student ID',
  },
  useCases: [
    {
      title: 'Chats & messages',
      copy: 'Names, emails, phone numbers, and delivery details tucked into message bubbles.',
      alt: 'A chat screenshot with black bars covering a name, email address, phone number, address, and card expiry.',
      sample: '/samples/chat.svg',
      sampleName: 'Chat screenshot',
      icon: 'chat',
      badge: 'Redacted',
    },
    {
      title: 'IDs & documents',
      copy: 'Photos, dates of birth, ID numbers, addresses, and machine-readable codes.',
      alt: 'A student ID card with black bars covering the photo, name, date of birth, ID number, address, barcode, and QR code.',
      sample: '/samples/id.svg',
      sampleName: 'Student ID',
      icon: 'id-card',
      badge: 'Redacted',
    },
    {
      title: 'Receipts & banking',
      copy: 'Card details, billing emails, order numbers, tax IDs, and support contacts.',
      alt: 'A receipt with black bars covering the order number, payment details, billing email, shipping address, tax ID, and support phone.',
      sample: '/samples/receipt.svg',
      sampleName: 'Receipt',
      icon: 'credit-card',
      badge: 'Redacted',
    },
    {
      title: 'Work dashboards',
      copy: 'Signed-in accounts, customer tables, revenue figures, and internal URLs.',
      alt: 'An analytics dashboard with black bars covering the account holder, customer names, email addresses, and revenue figures.',
      sample: '/samples/dashboard.svg',
      sampleName: 'Dashboard',
      icon: 'layout',
      badge: 'Redacted',
    },
  ],
  detection: {
    eyebrow: 'Smart detection',
    title: 'Stop hunting for the sensitive bits.',
    copy: 'Smart detection reads the text already visible in your image — or on the current PDF page — and suggests the lines that look like identifiers. It runs in a Web Worker on your device, so the file never leaves the page.',
    points: [
      'Finds emails, card numbers, phone numbers, IDs, addresses, and dates.',
      'Every box is a suggestion — include or exclude it before you redact.',
      'All text mode covers every detected line when you would rather not decide.',
      'Verify re-scans the flattened result for text that still looks sensitive, page by page for a PDF.',
    ],
    primaryCta: 'Try smart detection',
    secondaryCta: 'Read the redaction guide',
    footnote:
      'First use downloads the OCR engine and English model. Your file is not part of that request.',
  },
  styles: {
    eyebrow: 'Redaction styles',
    title: 'Four ways to make something disappear.',
    copy: 'Match the cover to the risk. The soft effects look better; the black box is the one to trust with money and identity.',
    cta: 'Open the editor',
  },
  privacy: {
    eyebrow: 'Privacy by architecture',
    title: 'There is nowhere for the file to go.',
    copy: 'This is not a promise to delete your file after processing. The file is never sent in the first place. You can confirm it in the network tab.',
    cta: 'Read the privacy notes',
    points: [
      {
        icon: 'monitor',
        title: 'Your browser does the work',
        copy: 'The file is decoded into a canvas in this tab. There is no upload endpoint to send it to.',
      },
      {
        icon: 'image',
        title: 'Exports are new files',
        copy: 'Image exports are re-encoded from a canvas; PDF pages are rebuilt as fresh images. Original EXIF, GPS, and document metadata stay behind.',
      },
      {
        icon: 'globe',
        title: 'The extra requests are disclosed',
        copy: 'Smart detection downloads Tesseract.js and an English model on first use, and opening a PDF loads the self-hosted PDF engine. Your file is never part of either request.',
      },
    ],
  },
  compare: {
    eyebrow: 'Compare',
    title: 'A small tool with a clear boundary.',
    copy: 'Categories, not specific products. The useful comparison is not the feature list — it is where your image goes.',
  },
  how: {
    eyebrow: 'How it works',
    title: 'Three steps. No account screen in the middle.',
    copy: 'Open the page, work on the image or PDF, take the file. That is the whole flow.',
    steps: [
      {
        number: '01',
        title: 'Drop or paste a file',
        copy: 'PNG, JPG, WebP, GIF, BMP, AVIF, or PDF. It opens locally — not on a server.',
        icon: 'image',
      },
      {
        number: '02',
        title: 'Cover what should not travel',
        copy: 'Run Smart detect on the current page, then move, resize, or draw boxes. Use ink, pixelate, blur, or a sticker.',
        icon: 'cursor',
      },
      {
        number: '03',
        title: 'Verify and download',
        copy: 'Re-scan the flattened result, then export PNG, JPG, or WebP with no metadata — or a flattened PDF with no text layer. Shrink images if the file is too heavy.',
        icon: 'shield-check',
      },
    ],
    cta: 'Start redacting',
  },
  guide: {
    eyebrow: 'Image redaction',
    title: 'Image redaction, from the pixels up.',
    lead: 'What a good tool removes, how on-device detection helps, and where each style stops.',
    intro:
      'Image redaction is the work of permanently removing or covering sensitive details in a picture before it is shared. A good image redaction tool does three things: it finds the information that matters, covers it in a way that cannot be peeled back, and leaves no hidden data in the exported file. This page explains how image redaction works in this editor, what the on-device detection can and cannot see, and the checks worth making before an image leaves your hands.',
    sections: [
      {
        id: 'what-image-redaction-removes',
        navLabel: 'What redaction removes',
        title: 'What image redaction actually removes',
        paragraphs: [
          'Redaction is not decoration. A black bar, a pixelated block, a blur, and a crop all change an image, but only some of them remove the information underneath. The test is simple: after export, the covered detail should not be readable, recoverable, or inferable from what remains. If a name, email address, card number, ID number, address, date of birth, barcode, or account handle can still be read — or reconstructed from the pixels — the image is not redacted yet.',
          'That distinction matters because screenshots are full of combinations. A name on its own may be public. The same name beside a postcode, an order number, and the last four digits of a card is a package that can unlock an account or support a payment. Cover what identifies a person, grants access, or proves a transaction, and treat any two of those details together as more sensitive than either one alone.',
        ],
      },
      {
        id: 'why-screenshots-leak',
        navLabel: 'Why screenshots leak',
        title: 'Why screenshots hide more than you think',
        paragraphs: [
          'A screenshot records the whole frame, not the part you meant to capture. Browser tabs, the URL bar, notification banners, a signed-in account chip, an avatar, a workspace name, a timestamp, and the file name in a window title all travel with the image. The detail you noticed first is rarely the only one worth covering.',
          'Image files can also carry metadata: EXIF fields, GPS coordinates, camera and device details, and the original file name. Screenshots hold less of it than camera photos, but assume anything the recipient does not need should not leave with the file. This editor exports a newly encoded image from a canvas, so the original metadata stays behind.',
        ],
      },
      {
        id: 'ai-image-redaction-software',
        navLabel: 'How the detection works',
        title: 'How AI image redaction software works here',
        paragraphs: [
          'The detection in this image redaction software is OCR plus pattern checks, not a generative model guessing at faces. Tesseract reads the text already visible in the image inside a Web Worker, then the editor looks for emails, Luhn-valid card numbers, phone numbers, SSNs, Aadhaar numbers, PANs, GSTINs, IBANs, IP addresses, dates, address keywords, and short capitalized lines that look like names. Every match arrives as a suggestion you can keep or dismiss.',
          'AI image redaction software is useful as a first pass, not a final authority. The scan can miss a face, a QR code, a barcode, a logo, or an unusual name, and it cannot know which details are sensitive in your context. Use it to stop hunting line by line, then review the frame yourself. All text mode covers every detected line when a busy screenshot makes individual judgment calls feel like a gamble.',
        ],
      },
      {
        id: 'image-redaction-online',
        navLabel: 'Online, without an upload',
        title: 'Image redaction online, without the upload',
        paragraphs: [
          'Most image redaction online tools ask you to send the file to a server, wait for it to come back, and trust that the copy was deleted. This one is built the other way around. The browser decodes the image into a canvas in the current tab, keeps the pixels in memory, and draws every redaction locally. There is no upload endpoint, so there is no server copy to delete. The privacy page documents every request the site makes.',
          'One request worth knowing about is smart detection. On first use, the page downloads Tesseract.js and an English language model. Your image is not part of that request. Manual redaction, undo, copy, and export work without it, and once the page has loaded you can keep editing offline.',
        ],
      },
      {
        id: 'redaction-styles',
        navLabel: 'Four styles, one to trust',
        title: 'Four styles, and the one to trust',
        paragraphs: [
          'Ink black draws an opaque, flattened shape over the original pixels. There is no gradient to reverse and no pattern to analyze, which is why it is the default for IDs, payment details, addresses, and anything that grants access to an account. Pixelate replaces an area with averaged color blocks; it can look decisive while preserving the shape of large letters. Blur is the softest option and the weakest guarantee, because lightly blurred or pixelated text and faces can sometimes be partially reconstructed.',
          'The emoji sticker draws an opaque plate before the emoji, so it covers the area instead of floating transparently over it. It suits a face in a casual group chat. Cropping is the strongest redaction of all when the surrounding context is not needed: a crop cannot be unblurred. For anything that identifies a person, moves money, or opens an account, reach for ink or a crop. Save the softer effects for context you would not mind losing.',
        ],
      },
      {
        id: 'image-redaction-tool',
        navLabel: 'What the tool should do',
        title: 'What a good image redaction tool should do',
        paragraphs: [
          'The feature list matters less than the boundary around it. A tool worth using should work on the file locally, keep every box editable until you export, flatten the result into new pixels, and verify its own output before you download. It should also be honest about where detection stops instead of implying that a scan is a guarantee.',
          'Those principles are the reason this editor works the way it does:',
        ],
        bullets: [
          'Local by default: the file is decoded in the tab, with no upload endpoint.',
          'Editable until export: boxes move, resize, undo, and redo; the download is flattened.',
          'Verified output: a re-scan flags text that still reads as sensitive.',
          'Clean files: fresh PNG, JPG, or WebP exports without the original metadata, plus a size panel that measures the real download.',
          'No account, no watermark, no payment.',
        ],
      },
      {
        id: 'pre-share-check',
        navLabel: 'A short pre-share check',
        title: 'A short check before you send',
        paragraphs: [
          'Before the image leaves your hands, make one slow pass over the whole frame. These checks catch most of the expensive mistakes:',
        ],
        bullets: [
          'Look at all four corners, the header, the tabs, and any notification.',
          'Use ink for identifiers and payment details; reserve blur and pixelate for context.',
          'Zoom in and confirm that no text peeks out from behind an edge.',
          'Run Verify, then open the exported file at full size.',
          'Ask whether a crop would be safer than a redaction.',
          'Send only the redacted version. Never follow it with the original.',
        ],
      },
    ],
    principles: [],
    checks: [],
    cta: 'Redact an image',
    relatedLinks: [
      { label: 'Receipts', slug: 'redact-a-receipt' },
      { label: 'IDs', slug: 'redact-an-id-card' },
      { label: 'work dashboards', slug: 'work-screenshot-checklist' },
      { label: 'chat screenshots', slug: 'how-to-redact-a-screenshot' },
    ],
    closing:
      'The short version is always the same: cover what identifies, verify what remains, and send the smallest image that still makes your point.',
  },
  guides: {
    eyebrow: 'Guides',
    title: 'A little paranoia, written down.',
    copy: 'Short, practical notes on what to cover, which style to use, and how to check your own work.',
    cta: 'All guides',
  },
  faq: {
    eyebrow: 'Redaction FAQ',
    title: 'Frequently asked questions about redacting images and PDFs.',
    copy: 'If something is missing, ask. The answer will be added here rather than buried in a support inbox.',
    ask: 'Ask a question',
  },
  cta: {
    eyebrow: 'Ready when you are',
    title: 'The safest screenshot is the one with less in it.',
    copy: 'Open the editor, drop an image or PDF, and take a minute to cover what should not travel with it. No account, no upload, no watermark.',
    primary: 'Redact a file',
    secondary: 'Read the privacy notes',
    secondaryHref: '/privacy',
  },
};
