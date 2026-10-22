import type { FaqItem } from './faq';

/**
 * Long-form landing pages for the free tools. Each entry is rendered by
 * `ToolPage.astro` at its own root URL and is English-only for now, so the
 * sitemap lists it once without hreflang alternates.
 */

export interface ToolPageContent {
  meta: {
    title: string;
    description: string;
    keywords: string[];
  };
  hero: {
    eyebrow: string;
    title: string;
    lead: string;
    primary: string;
    primaryHref: string;
    secondary: string;
    secondaryHref: string;
    proof: string[];
  };
  /** Which interactive tool sits directly under the hero. */
  editor?: 'redactor' | 'metadata';
  intro: {
    eyebrow: string;
    title: string;
    paragraphs: string[];
  };
  features: {
    id?: string;
    eyebrow: string;
    title: string;
    copy?: string;
    items: { icon: string; title: string; copy: string }[];
  };
  steps: {
    eyebrow: string;
    title: string;
    copy?: string;
    items: { title: string; copy: string }[];
  };
  safety?: {
    id?: string;
    title: string;
    text: string;
  };
  checklist?: {
    title: string;
    copy?: string;
    items: string[];
  };
  faqs: FaqItem[];
  related: { href: string; label: string; title: string; copy: string }[];
  cta: {
    eyebrow: string;
    title: string;
    copy: string;
    primary: string;
    primaryHref: string;
    secondary: string;
    secondaryHref: string;
  };
}

const sharedProof = ['Free', 'No account', 'No upload', 'No watermark'];

export const blurTextInImage: ToolPageContent = {
  meta: {
    title: 'Blur Text in an Image Online — Free, Private | Redact',
    description:
      'Blur names, emails, card numbers, and addresses in any screenshot or photo. Draw a box, choose Blur, and export — all in your browser. No upload, no account.',
    keywords: [
      'blur text in image',
      'blur text in photo',
      'blur text online',
      'blur screenshot text',
      'hide text in image',
      'blur sensitive text',
      'blur text free',
    ],
  },
  hero: {
    eyebrow: 'Blur text in an image',
    title: 'Blur the words, not the whole photo.',
    lead: 'Drop a screenshot or photo, draw a box around any text you want to soften, and choose Blur. The file stays in your browser, and the export carries no metadata.',
    primary: 'Blur text now',
    primaryHref: '#editor',
    secondary: 'Blur vs black box',
    secondaryHref: '#blur-safety',
    proof: sharedProof,
  },
  editor: 'redactor',
  intro: {
    eyebrow: 'The quick version',
    title: 'A blur box takes about ten seconds',
    paragraphs: [
      'Open the editor above and load an image. Pick Blur in the style row, drag a box over the text, then export. That is the whole workflow. There is no upload step, no queue, and no sign-up screen.',
      'Blur is a good fit for context you want to soften: a stranger in the background, a whiteboard sketch, a name in a group chat that does not need to travel. It is a poor fit for a card number, an ID, or an address. Those need an opaque fill because the pixels underneath a blur still exist.',
      'If you are not sure which style to use, start with Ink. It is the only style that removes the information rather than rearranging it.',
    ],
  },
  features: {
    eyebrow: 'What you can do',
    title: 'Blur text without an image editor',
    items: [
      {
        icon: 'blur',
        title: 'Draw a blur box',
        copy: 'Drag over any word, line, or paragraph. Resize the box with its handles before you export.',
      },
      {
        icon: 'scan',
        title: 'Find text automatically',
        copy: 'Smart detect runs OCR on your device and proposes boxes around emails, card numbers, phone numbers, IDs, and likely names.',
      },
      {
        icon: 'face-scan',
        title: 'Soften a face too',
        copy: 'Detect faces adds boxes around faces. Apply Blur, or switch to ink for a stronger cover.',
      },
      {
        icon: 'eye-off',
        title: 'Compare before export',
        copy: 'Hold Compare to see the original underneath, then check the flattened result before you download.',
      },
      {
        icon: 'download',
        title: 'Export PNG, JPG, or WebP',
        copy: 'Pick the format, cap the long edge if the file is heavy, and download a new image.',
      },
      {
        icon: 'wifi-off',
        title: 'Works offline after load',
        copy: 'The editor and manual redactions keep working without a network. Nothing is sent anywhere.',
      },
    ],
  },
  steps: {
    eyebrow: 'How it works',
    title: 'Blur text in three steps',
    items: [
      {
        title: 'Load the image',
        copy: 'Drop a screenshot, paste it with Ctrl/Cmd + V, or choose a file. Images up to 25 MB; PDFs work too.',
      },
      {
        title: 'Mark the text',
        copy: 'Pick Blur, then drag a box over the words. Use Smart detect if you want the text lines suggested for you.',
      },
      {
        title: 'Check and export',
        copy: 'Use Compare and Verify, then download. The export is re-encoded without EXIF or GPS metadata.',
      },
    ],
  },
  safety: {
    id: 'blur-safety',
    title: 'Blur hides detail. It does not always erase it.',
    text: 'Research has shown that lightly blurred or pixelated text can sometimes be partially reconstructed, especially when the text is large or the blur is soft. Use Blur for casual context, and use Ink or Crop for anything that identifies a person, an account, or a payment method.',
  },
  checklist: {
    title: 'When blur is the right tool',
    copy: 'A simple rule keeps the choice easy.',
    items: [
      'A face in a crowd, when the person is not the subject of the photo.',
      'A name or handle in a chat screenshot that you do not need to share.',
      'A whiteboard or note where the general shape matters and the exact words do not.',
      'Background clutter that distracts from the point of the image.',
      'Not for card numbers, IDs, addresses, passwords, or account recovery details — use Ink.',
      'Not for a document where the text layout alone can reveal the content — use Crop.',
    ],
  },
  faqs: [
    {
      question: 'Can blurred text be recovered?',
      answer:
        'Sometimes. Blur is a lossy effect, not a deletion. If the text is large, high-contrast, or only lightly blurred, a researcher or a model may recover part of it. For anything sensitive, use Ink black or crop the area out.',
    },
    {
      question: 'Does the image get uploaded?',
      answer:
        'No. The image is decoded by your browser and drawn to a local canvas. There is no upload endpoint, so it never reaches a server. Smart detection downloads an OCR model the first time, but your file stays in the tab.',
    },
    {
      question: 'Can I blur text in a PDF?',
      answer:
        'Yes. Open a PDF, pick Blur, and mark each page. Export rebuilds every page as an image in a new PDF, so the original text layer and metadata do not survive.',
    },
    {
      question: 'Which format should I export?',
      answer:
        'PNG for screenshots and text; JPG for photos where a smaller file matters; WebP when you want both. All three exports are re-encoded from pixels and carry no original EXIF or GPS.',
    },
    {
      question: 'Does it work on iPhone and Android?',
      answer:
        'Yes. Open the site in Safari or Chrome, choose a photo from your library, and export. The mobile editor supports touch, pinch zoom, and the same blur styles.',
    },
    {
      question: 'Is blur better than pixelate?',
      answer:
        'They fail in similar ways. Pixelation replaces an area with block averages; blur averages neighbouring pixels. Neither removes the underlying information, so neither is a safe choice for a secret.',
    },
  ],
  related: [
    {
      href: '/redact-screenshot',
      label: 'Screenshot redaction',
      title: 'Redact a screenshot',
      copy: 'A repeatable pass for names, emails, and the details people usually miss.',
    },
    {
      href: '/remove-exif-data',
      label: 'Photo metadata',
      title: 'Remove EXIF data',
      copy: 'Strip GPS, camera, and timestamp metadata from a photo before sharing it.',
    },
    {
      href: '/guides/blur-vs-pixelate-vs-black-box',
      label: 'Guide',
      title: 'Blur vs pixelate vs black box',
      copy: 'Which style actually removes the information, and when each one is safe.',
    },
  ],
  cta: {
    eyebrow: 'Ready when you are',
    title: 'Blur the text and keep the picture.',
    copy: 'Open the editor, load a screenshot, and export a clean copy. No account, no upload, no watermark.',
    primary: 'Blur an image',
    primaryHref: '#editor',
    secondary: 'Read the redaction guide',
    secondaryHref: '/guides/how-to-redact-a-screenshot',
  },
};

export const redactScreenshot: ToolPageContent = {
  meta: {
    title: 'Redact a Screenshot Online — Free, Private, No Upload | Redact',
    description:
      'Hide names, emails, card numbers, addresses, and notifications in a screenshot. Smart detection runs on your device. Free, no account, no watermark.',
    keywords: [
      'redact screenshot',
      'redact screenshot online',
      'hide text in screenshot',
      'screenshot redaction',
      'blur screenshot',
      'redact screenshot free',
      'censor screenshot',
    ],
  },
  hero: {
    eyebrow: 'Screenshot redaction',
    title: 'Redact a screenshot before it leaves your screen.',
    lead: 'A screenshot records more than the part you meant to capture. Cover the names, emails, account chips, and notifications — then export a flattened copy with no metadata.',
    primary: 'Redact a screenshot',
    primaryHref: '#editor',
    secondary: 'What to check',
    secondaryHref: '#checklist',
    proof: sharedProof,
  },
  editor: 'redactor',
  intro: {
    eyebrow: 'The 60-second habit',
    title: 'The black box is the easy part',
    paragraphs: [
      'Most leaks are not in the message you meant to share. They are in the header that says who you are, the notification that previews the next message, the tab title, or the order number under the barcode.',
      'Redacting a screenshot is a short, repeatable pass: scan the whole frame, cover identifiers with ink, verify the flattened image, then export. The editor does the flattening and metadata removal; the scan is still yours to do.',
      'Use this page as the hub. The device guides below cover the exact capture and save steps for iPhone, Mac, Windows, and Android.',
    ],
  },
  features: {
    eyebrow: 'Built for screenshots',
    title: 'Everything a screenshot needs',
    items: [
      {
        icon: 'square',
        title: 'Ink black by default',
        copy: 'An opaque fill leaves no recoverable pixels. Use it for names, emails, cards, and IDs.',
      },
      {
        icon: 'scan',
        title: 'Smart detect',
        copy: 'On-device OCR proposes emails, card numbers, phone numbers, IDs, addresses, and likely names.',
      },
      {
        icon: 'face-scan',
        title: 'Face detection',
        copy: 'Blur or cover profile photos and faces in the frame, including avatars in a chat.',
      },
      {
        icon: 'eye-off',
        title: 'Verify',
        copy: 'Re-scan the flattened result for readable PII before you download.',
      },
      {
        icon: 'download',
        title: 'Clean export',
        copy: 'PNG, JPG, or WebP with no original EXIF, GPS, or hidden layer.',
      },
      {
        icon: 'monitor',
        title: 'PDF too',
        copy: 'Open a PDF, redact each page, and export a flattened copy.',
      },
    ],
  },
  steps: {
    eyebrow: 'The 60-second pass',
    title: 'How to redact a screenshot',
    items: [
      {
        title: 'Capture the smallest frame',
        copy: 'Screenshot the app window, not the whole desktop. Fewer pixels means fewer places for a secret to hide.',
      },
      {
        title: 'Scan in a Z',
        copy: 'Top-left to top-right, down, then back. Check the header, URL bar, tabs, sidebar, notifications, and all four corners.',
      },
      {
        title: 'Cover with ink',
        copy: 'One box per field. Use Smart detect for a head start, then add anything it missed: QR codes, barcodes, and logos need a manual box.',
      },
      {
        title: 'Verify and export',
        copy: 'Run Verify, compare the flattened image, then download. Open the export at full size before you send it.',
      },
    ],
  },
  checklist: {
    title: 'The screenshot checklist',
    copy: 'Twelve seconds of looking beats a perfect black box in the wrong place.',
    items: [
      'Display name, username, handle, avatar, and profile photo.',
      'Email addresses, phone numbers, and account IDs in message bubbles.',
      'Browser tabs, bookmarks, and the URL bar.',
      'Notification banners and message previews.',
      'Order numbers, invoice numbers, barcodes, and QR codes.',
      'Addresses, delivery instructions, and dates of birth.',
      'Card numbers, expiry dates, and bank names.',
      'Timestamps that reveal routines or time zones.',
      'Other windows visible behind the app.',
      'File names, window titles, and workspace names.',
    ],
  },
  faqs: [
    {
      question: 'Is it safe to upload a screenshot?',
      answer:
        'With this tool there is no upload. The image is read by your browser and drawn to a canvas in the tab. If a service asks you to upload a screenshot of an ID or a bank statement, redact it first.',
    },
    {
      question: 'What should I redact in a screenshot?',
      answer:
        'Anything that identifies a person or an account: names, emails, phone numbers, addresses, card numbers, IDs, order numbers, QR codes, and avatars. Also check tabs, URL bars, and notifications, which are easy to forget.',
    },
    {
      question: 'Can I redact a screenshot on my phone?',
      answer:
        'Yes. The editor works in mobile Safari and Chrome. Use the device guide for the exact capture and save steps: iPhone, Android, Mac, or Windows.',
    },
    {
      question: 'Does redacting remove metadata?',
      answer:
        'The export is rebuilt from pixels, so the original EXIF, GPS, and software metadata are not copied. That matters more for camera photos than for screenshots, but it is true for both.',
    },
    {
      question: 'Can I undo after exporting?',
      answer:
        'No. Export flattens the redactions into the new file. While you are editing, Undo, Redo, and Delete work normally in the tab.',
    },
    {
      question: 'Does Smart detect catch everything?',
      answer:
        'No. It is a strong first pass for text patterns and faces, but it can miss stylised text, unusual names, QR codes, barcodes, and small UI labels. Verify and a final visual check are part of the workflow.',
    },
  ],
  related: [
    {
      href: '/redact-screenshot-iphone',
      label: 'iPhone',
      title: 'Redact a screenshot on iPhone',
      copy: 'Capture with the side buttons, redact in Safari, and save the clean copy to Photos.',
    },
    {
      href: '/redact-screenshot-mac',
      label: 'Mac',
      title: 'Redact a screenshot on Mac',
      copy: 'Use Shift + Command + 4 or 5, drag the file in, and export a flattened copy.',
    },
    {
      href: '/redact-screenshot-windows',
      label: 'Windows',
      title: 'Redact a screenshot on Windows',
      copy: 'Snip with Win + Shift + S, paste with Ctrl + V, and download the clean image.',
    },
    {
      href: '/redact-screenshot-android',
      label: 'Android',
      title: 'Redact a screenshot on Android',
      copy: 'Capture, redact in Chrome, and share the copy from Downloads instead of the original.',
    },
    {
      href: '/blur-text-in-image',
      label: 'Blur text',
      title: 'Blur text in an image',
      copy: 'Softening a name or background face? Here is when blur is enough and when it is not.',
    },
    {
      href: '/remove-exif-data',
      label: 'Metadata',
      title: 'Remove EXIF data',
      copy: 'Photos can carry GPS and camera details. Strip them before the file is shared.',
    },
  ],
  cta: {
    eyebrow: 'One screenshot at a time',
    title: 'Share the screenshot. Not the secrets.',
    copy: 'Open the editor, drop the capture, and take a minute over the frame. No account, no upload, no watermark.',
    primary: 'Redact a screenshot',
    primaryHref: '#editor',
    secondary: 'Read the screenshot guide',
    secondaryHref: '/guides/how-to-redact-a-screenshot',
  },
};

export const redactScreenshotIphone: ToolPageContent = {
  meta: {
    title: 'Redact a Screenshot on iPhone — Free, No Upload | Redact',
    description:
      'Hide names, emails, and card numbers in an iPhone screenshot. Works in Safari, saves to Photos or Files, and never uploads the image.',
    keywords: [
      'redact screenshot iphone',
      'blur text iphone screenshot',
      'hide text in screenshot iphone',
      'redact photo iphone',
      'iphone screenshot redaction',
    ],
  },
  hero: {
    eyebrow: 'iPhone',
    title: 'Redact a screenshot on iPhone',
    lead: 'Take the screenshot, open Safari, and cover what should not travel. The editor works with touch, runs on the device, and exports a clean copy you can save to Photos or Files.',
    primary: 'Open the editor',
    primaryHref: '#editor',
    secondary: 'iPhone steps',
    secondaryHref: '#steps',
    proof: ['Works in Safari', 'No app to install', 'No upload', 'Free'],
  },
  editor: 'redactor',
  intro: {
    eyebrow: 'No app required',
    title: 'No app, no iCloud round trip',
    paragraphs: [
      'The shortest path is Safari. Open this page, tap Choose a file, and pick the screenshot from your Photo Library. Draw a box with a finger, pinch to zoom, and export when the image looks right.',
      'The editor does not need a native app and does not send the screenshot to iCloud or to a server. The file is decoded inside the tab. If you are on a metered connection, note that Smart detection downloads its OCR model the first time you use it; manual boxes never need a download.',
      'If you only need to hide one name, the whole job can take under a minute. The steps below cover capture, redaction, and the sometimes-fiddly save-to-Photos step.',
    ],
  },
  features: {
    eyebrow: 'Made for touch',
    title: 'What works well on iPhone',
    items: [
      {
        icon: 'cursor',
        title: 'One-finger boxes',
        copy: 'Draw a box, then drag its handles to tighten the edges around the text.',
      },
      {
        icon: 'zoom-in',
        title: 'Pinch to zoom',
        copy: 'Zoom in before placing a box so no ascender or punctuation mark peeks out.',
      },
      {
        icon: 'scan',
        title: 'On-device detection',
        copy: 'Smart detect and Detect faces run locally. The first run downloads the models; the image never leaves the phone.',
      },
      {
        icon: 'download',
        title: 'Save to Photos or Files',
        copy: 'Export PNG, JPG, or WebP, then save the download wherever you keep screenshots.',
      },
      {
        icon: 'wifi-off',
        title: 'Works offline',
        copy: 'After the page has loaded, manual redaction and export keep working without a connection.',
      },
      {
        icon: 'lock',
        title: 'No account',
        copy: 'No sign-in, no app install, no watermark, and no upload endpoint.',
      },
    ],
  },
  steps: {
    eyebrow: 'On iOS',
    title: 'Redact a screenshot on iPhone in four steps',
    items: [
      {
        title: 'Take the screenshot',
        copy: 'Press the Side button and Volume Up at the same time. On an iPhone with a Home button, press the Side (or Top) button and Home. The shot lands in Photos → Recents.',
      },
      {
        title: 'Open the editor in Safari',
        copy: 'Tap Choose a file, then Photo Library, and select the screenshot. You can also tap Browse to pick a file from iCloud Drive or On My iPhone.',
      },
      {
        title: 'Mark the sensitive areas',
        copy: 'Choose Ink for names, emails, cards, and IDs. Drag a box with one finger; use two fingers to pan and pinch to zoom. Smart detect can suggest text boxes if you want a head start.',
      },
      {
        title: 'Export and save',
        copy: 'Tap Download. iOS saves the file through the Downloads popover; open it, then share or long-press the image and choose Save Image to put it back in Photos.',
      },
    ],
  },
  safety: {
    title: 'Do not rely on the Photos markup blur',
    text: 'The Markup tool in Photos is handy for a quick scribble, but a light highlighter or blur is not a guarantee. For a card number, an address, or an ID, use an opaque box in the editor and export a new file. The same applies to the “hide” tools in third-party screenshot apps.',
  },
  checklist: {
    title: 'Before you save the redacted copy',
    items: [
      'The status bar does not show a name, phone number, or carrier detail you meant to hide.',
      'Notification previews and banners are covered or cropped out.',
      'The URL bar, tab title, and any account chip are covered.',
      'The screenshot has been checked at full size, not only in the editor preview.',
      'The exported file is the copy you share — not the original from Photos.',
    ],
  },
  faqs: [
    {
      question: 'Can I redact a screenshot on iPhone without an app?',
      answer:
        'Yes. Safari can run the editor, and the export goes through the normal iOS download flow. There is nothing to install.',
    },
    {
      question: 'Where does the downloaded image go on iPhone?',
      answer:
        'Safari saves it to Downloads, usually in iCloud Drive or On My iPhone depending on your Safari settings. Open the download, then use Share → Save Image to add it to Photos.',
    },
    {
      question: 'Does the image go to iCloud?',
      answer:
        'Not through this tool. The file is read inside the Safari tab. If iCloud Photos is syncing your Photo Library, that is a separate Apple setting; the editor itself does not upload anything.',
    },
    {
      question: 'Does it work on iPad?',
      answer: 'Yes. The layout adapts to the larger screen, and the same touch controls apply.',
    },
    {
      question: 'Can I redact a Live Photo?',
      answer:
        'The editor reads a still image. A Live Photo is exported as a still when you choose it through the file picker. The motion and the original metadata are not carried into the download.',
    },
    {
      question: 'The page is slow with a huge photo. What can I do?',
      answer:
        'Very large photos can hit the browser’s memory limit on a phone. Take a screenshot of the photo instead, or crop it first, then redact the smaller image.',
    },
  ],
  related: [
    {
      href: '/redact-screenshot',
      label: 'All devices',
      title: 'Redact a screenshot',
      copy: 'The full checklist for names, emails, notifications, tabs, and URLs.',
    },
    {
      href: '/redact-screenshot-android',
      label: 'Android',
      title: 'Redact a screenshot on Android',
      copy: 'Capture, redact in Chrome, and share the copy from Downloads.',
    },
    {
      href: '/remove-exif-data',
      label: 'Metadata',
      title: 'Remove EXIF data',
      copy: 'A photo’s GPS and camera details can travel with the file. Strip them first.',
    },
  ],
  cta: {
    eyebrow: 'iPhone, iPad, Safari',
    title: 'Redact it on the phone, before the share sheet.',
    copy: 'Open the editor, choose the screenshot, and export a clean copy. No app, no account, no upload.',
    primary: 'Open the editor',
    primaryHref: '#editor',
    secondary: 'Redact a screenshot',
    secondaryHref: '/redact-screenshot',
  },
};

export const redactScreenshotMac: ToolPageContent = {
  meta: {
    title: 'Redact a Screenshot on Mac — Free, Private | Redact',
    description:
      'Hide text in a Mac screenshot with an on-device editor. Works in Safari or Chrome, exports a clean PNG, JPG, or WebP, and never uploads the file.',
    keywords: [
      'redact screenshot mac',
      'redact screenshot macbook',
      'blur text screenshot mac',
      'hide text in screenshot mac',
      'mac screenshot redaction',
    ],
  },
  hero: {
    eyebrow: 'Mac',
    title: 'Redact a screenshot on Mac',
    lead: 'Capture with the built-in shortcuts, drop the file into the browser, and export a flattened copy. No upload, no account, and no extra app.',
    primary: 'Open the editor',
    primaryHref: '#editor',
    secondary: 'Mac steps',
    secondaryHref: '#steps',
    proof: ['Safari & Chrome', 'Keyboard-first', 'No upload', 'Free'],
  },
  editor: 'redactor',
  intro: {
    eyebrow: 'Capture, then redact',
    title: 'Use the Mac capture tools, then finish in the browser',
    paragraphs: [
      'macOS has excellent capture tools, which makes the redaction step the only one that needs care. Shift + Command + 4 gives you a region; Shift + Command + 5 opens the full capture bar; Space toggles window capture.',
      'Drag the PNG from the Desktop straight into the editor (or paste it with Command + V). The file is read locally by the browser. Redact, verify, and export a new file.',
      'Do not stop at a highlighter in Preview. A markup scribble can be moved, partially transparent, or simply too light. The editor paints an opaque fill and flattens it into the exported pixels.',
    ],
  },
  features: {
    eyebrow: 'Desktop shortcuts',
    title: 'What works well on a Mac',
    items: [
      {
        icon: 'keyboard',
        title: 'Keyboard shortcuts',
        copy: 'Undo, redo, delete, zoom, and compare all have shortcuts. The editor stays out of the way.',
      },
      {
        icon: 'monitor',
        title: 'Retina-aware',
        copy: 'Boxes are stored relative to the image, so the export stays sharp at native resolution.',
      },
      {
        icon: 'scan',
        title: 'Local OCR',
        copy: 'Smart detect reads text in the browser and proposes boxes for sensitive patterns.',
      },
      {
        icon: 'download',
        title: 'Clean export',
        copy: 'Download PNG, JPG, or WebP. The new file has no EXIF, GPS, or hidden layer.',
      },
      {
        icon: 'file',
        title: 'Drag from Finder',
        copy: 'Drop a screenshot straight from the Desktop or a Finder window into the editor.',
      },
      {
        icon: 'eye-off',
        title: 'Compare',
        copy: 'Hold Compare to check the original underneath before you commit to the export.',
      },
    ],
  },
  steps: {
    eyebrow: 'On macOS',
    title: 'Redact a screenshot on Mac in four steps',
    items: [
      {
        title: 'Capture the window, not the desktop',
        copy: 'Use Shift + Command + 4, then press Space and click the window. This keeps other apps, tabs, and notifications out of the frame.',
      },
      {
        title: 'Load it in the editor',
        copy: 'Drag the screenshot from the Desktop into the drop zone, or press Command + V after copying it. Safari and Chrome both work.',
      },
      {
        title: 'Mark and verify',
        copy: 'Use Ink for identifiers, Smart detect for a first pass, and Verify to re-scan the flattened result.',
      },
      {
        title: 'Export a clean copy',
        copy: 'Download PNG for text or JPG/WebP for a smaller file. The new file carries no original EXIF, GPS, or hidden layer.',
      },
    ],
  },
  safety: {
    title: 'Preview markup is not a redaction tool',
    text: 'Preview is great for arrows and circles. Its highlighter and shape fills are not designed to guarantee that the pixels underneath are gone, and an image or PDF can keep its metadata. Use an opaque box here and export a new file when the content is sensitive.',
  },
  checklist: {
    title: 'A Mac screenshot checklist',
    items: [
      'Browser tabs, bookmarks, and the URL bar.',
      'The menu bar, which can show the signed-in account or the app name.',
      'Window titles, sidebars, and workspace names.',
      'Notification banners and unread-message previews.',
      'Other windows or screens visible in the frame.',
      'File names on the Desktop, if the capture includes them.',
      'Dock badges that reveal an app or a count.',
      'The signed-in profile chip and avatars.',
    ],
  },
  faqs: [
    {
      question: 'How do I redact a screenshot on Mac?',
      answer:
        'Capture it with Shift + Command + 4 or 5, drag the file into the editor, cover the sensitive areas with ink, run Verify, and download the flattened copy.',
    },
    {
      question: 'Does the editor work in Safari?',
      answer:
        'Yes. Safari and Chrome are both supported. Very large images are downscaled to a 5,200 px long edge so the tab stays responsive.',
    },
    {
      question: 'Can I paste a screenshot directly?',
      answer:
        'Yes. Copy the image, click the page, and press Command + V. The editor reads it from the clipboard without a file.',
    },
    {
      question: 'Where does the export go?',
      answer:
        'It goes to your browser’s Downloads folder, usually ~/Downloads. Safari and Chrome both ask once where to save files if you have that preference enabled.',
    },
    {
      question: 'Does the export remove metadata?',
      answer:
        'Yes. The download is rebuilt from the visible pixels, so the original EXIF, GPS, and software blocks are not copied into the new file.',
    },
    {
      question: 'Can I redact a PDF on Mac?',
      answer:
        'Yes. Open a PDF up to 50 MB and 100 pages, redact each page, and export a rebuilt PDF. The text layer, links, and metadata do not survive.',
    },
  ],
  related: [
    {
      href: '/redact-screenshot',
      label: 'All devices',
      title: 'Redact a screenshot',
      copy: 'The full checklist for names, emails, notifications, tabs, and URLs.',
    },
    {
      href: '/redact-screenshot-windows',
      label: 'Windows',
      title: 'Redact a screenshot on Windows',
      copy: 'Snip with Win + Shift + S and paste straight into the editor.',
    },
    {
      href: '/redact-screenshot-iphone',
      label: 'iPhone',
      title: 'Redact a screenshot on iPhone',
      copy: 'The same workflow, with the iOS save-to-Photos steps.',
    },
  ],
  cta: {
    eyebrow: 'Mac, Safari, Chrome',
    title: 'Capture the window. Keep the secrets out.',
    copy: 'Open the editor, drag the screenshot in, and export a clean copy. No account, no upload, no watermark.',
    primary: 'Open the editor',
    primaryHref: '#editor',
    secondary: 'Redact a screenshot',
    secondaryHref: '/redact-screenshot',
  },
};

export const redactScreenshotWindows: ToolPageContent = {
  meta: {
    title: 'Redact a Screenshot on Windows — Free, No Upload | Redact',
    description:
      'Use Win + Shift + S, paste into the browser, and hide names, emails, and card numbers. On-device redaction with no upload and no install.',
    keywords: [
      'redact screenshot windows',
      'redact screenshot windows 11',
      'blur text screenshot windows',
      'hide text in screenshot windows',
      'snipping tool redact',
    ],
  },
  hero: {
    eyebrow: 'Windows',
    title: 'Redact a screenshot on Windows',
    lead: 'Snip it, paste it, cover the secrets, and download a flattened copy. The editor runs in Edge or Chrome and never uploads the image.',
    primary: 'Open the editor',
    primaryHref: '#editor',
    secondary: 'Windows steps',
    secondaryHref: '#steps',
    proof: ['Edge & Chrome', 'Paste with Ctrl+V', 'No upload', 'Free'],
  },
  editor: 'redactor',
  intro: {
    eyebrow: 'Clipboard-first',
    title: 'From snip to clean export without saving a file',
    paragraphs: [
      'Win + Shift + S opens the Snipping Tool overlay. Drag a rectangle, and the snip is copied to the clipboard. That means you can go straight to the editor and press Ctrl + V — no file, no Save As dialog, no intermediate folder.',
      'The Snipping Tool has a pen and highlighter, but those annotations are not a guarantee. A highlighter is translucent by design. For an email, a card number, or an account ID, use the editor’s ink box and export a new file.',
      'Windows Photos and Paint can crop, but they do not give you a verified, flattened redaction with metadata removed. That is the gap this page fills.',
    ],
  },
  features: {
    eyebrow: 'Built for Windows',
    title: 'What works well on a PC',
    items: [
      {
        icon: 'keyboard',
        title: 'Clipboard-first',
        copy: 'Ctrl + V pastes a snip straight into the editor, without saving a file first.',
      },
      {
        icon: 'scan',
        title: 'Local OCR',
        copy: 'Smart detect runs in the browser and proposes boxes for emails, cards, phones, IDs, and names.',
      },
      {
        icon: 'eye-off',
        title: 'Verify',
        copy: 'Re-scan the flattened result for readable text before you download.',
      },
      {
        icon: 'download',
        title: 'PNG, JPG, or WebP',
        copy: 'Choose the format and cap the long edge when the capture is heavy.',
      },
      {
        icon: 'file',
        title: 'Drag from Explorer',
        copy: 'Drop a saved screenshot from File Explorer into the editor.',
      },
      {
        icon: 'lock',
        title: 'No upload',
        copy: 'The file stays in the tab. There is no upload endpoint and no account.',
      },
    ],
  },
  steps: {
    eyebrow: 'On Windows 10 and 11',
    title: 'Redact a screenshot on Windows in four steps',
    items: [
      {
        title: 'Snip the smallest area',
        copy: 'Press Win + Shift + S and drag around the app window. Avoid the taskbar and any notification toast if you can.',
      },
      {
        title: 'Paste into the editor',
        copy: 'Press Ctrl + V anywhere on the page after the editor loads. You can also drag a saved PNG from File Explorer.',
      },
      {
        title: 'Cover and verify',
        copy: 'Ink for identifiers, Smart detect for a head start, Verify for a second look at the flattened result.',
      },
      {
        title: 'Download the clean copy',
        copy: 'Choose PNG, JPG, or WebP. Open the export at full size before you attach it to a ticket or chat.',
      },
    ],
  },
  safety: {
    title: 'The highlighter problem',
    text: 'A yellow highlighter looks like it hides text, but it is usually translucent. Zoom in or change the background and the words can still be read. Use an opaque fill, and check the exported file at 100% before you send it.',
  },
  checklist: {
    title: 'A Windows screenshot checklist',
    items: [
      'Taskbar thumbnails and window previews.',
      'Notification Center toasts and unread badges.',
      'Browser profile chip, tabs, and the URL bar.',
      'The window title and any OneDrive or file path.',
      'Teams, Slack, or email channel names.',
      'Customer names, emails, and revenue in tables.',
      'The signed-in account avatar and workspace name.',
      'Anything visible on a second monitor.',
    ],
  },
  faqs: [
    {
      question: 'How do I redact a screenshot on Windows 11?',
      answer:
        'Press Win + Shift + S to snip, press Ctrl + V in the editor, cover the sensitive areas with ink, run Verify, and download the flattened image.',
    },
    {
      question: 'Can I paste a snip directly?',
      answer:
        'Yes. The Snipping Tool puts the capture on the clipboard, and the editor accepts it with Ctrl + V. No file is needed.',
    },
    {
      question: 'Does it work in Microsoft Edge?',
      answer:
        'Yes. Edge and Chrome are both supported. The editor uses standard canvas and file APIs, with no extension or install.',
    },
    {
      question: 'Is the Snipping Tool blur safe?',
      answer:
        'No. A pen or highlighter is an annotation, not a guarantee that the pixels are gone. Save the snip, redact it with an opaque box, and export a new file.',
    },
    {
      question: 'Does the export remove metadata?',
      answer:
        'Yes. The download is rebuilt from the visible pixels, so the original EXIF, GPS, and software blocks are not copied into the new file.',
    },
    {
      question: 'Can I redact a PDF on Windows?',
      answer:
        'Yes. Open a PDF in the editor, redact each page, and export a rebuilt PDF. The original text layer and metadata do not survive.',
    },
  ],
  related: [
    {
      href: '/redact-screenshot',
      label: 'All devices',
      title: 'Redact a screenshot',
      copy: 'The full checklist for names, emails, notifications, tabs, and URLs.',
    },
    {
      href: '/redact-screenshot-mac',
      label: 'Mac',
      title: 'Redact a screenshot on Mac',
      copy: 'Use the macOS capture shortcuts and drag the file into the editor.',
    },
    {
      href: '/redact-screenshot-android',
      label: 'Android',
      title: 'Redact a screenshot on Android',
      copy: 'Capture with the hardware buttons and finish in Chrome.',
    },
  ],
  cta: {
    eyebrow: 'Windows, Edge, Chrome',
    title: 'Snip it. Redact it. Send the copy.',
    copy: 'Open the editor, paste the snip, and export a clean image. No account, no upload, no watermark.',
    primary: 'Open the editor',
    primaryHref: '#editor',
    secondary: 'Redact a screenshot',
    secondaryHref: '/redact-screenshot',
  },
};

export const redactScreenshotAndroid: ToolPageContent = {
  meta: {
    title: 'Redact a Screenshot on Android — Free, Private | Redact',
    description:
      'Hide names, emails, and card numbers in an Android screenshot. Works in Chrome, saves to Downloads or Photos, and never uploads the image.',
    keywords: [
      'redact screenshot android',
      'blur text android screenshot',
      'hide text screenshot android',
      'android screenshot redaction',
      'redact photo android',
    ],
  },
  hero: {
    eyebrow: 'Android',
    title: 'Redact a screenshot on Android',
    lead: 'Capture with the hardware buttons, open Chrome, and cover anything that identifies you. Touch-friendly, on-device, and free.',
    primary: 'Open the editor',
    primaryHref: '#editor',
    secondary: 'Android steps',
    secondaryHref: '#steps',
    proof: ['Works in Chrome', 'No app install', 'No upload', 'Free'],
  },
  editor: 'redactor',
  intro: {
    eyebrow: 'No app required',
    title: 'The share sheet is fast. Check the frame first.',
    paragraphs: [
      'Android screenshots usually land in Photos or Gallery and stay one tap away from a share sheet. That convenience is exactly why the redaction step matters: the same sheet can send the original to a group chat before you notice the account chip in the corner.',
      'Open this page in Chrome, choose the screenshot from Files or Photos, and draw boxes with a finger. Pinch to zoom before you place a box near small text.',
      'The editor reads the file inside the tab. There is no upload, no account, and no proprietary format. The download is a normal image file.',
    ],
  },
  features: {
    eyebrow: 'Made for touch',
    title: 'What works well on Android',
    items: [
      {
        icon: 'cursor',
        title: 'Finger-friendly boxes',
        copy: 'Drag a box, then use the handles to tighten it around the text.',
      },
      {
        icon: 'zoom-in',
        title: 'Pinch to zoom',
        copy: 'Get close before you place a box so no edge of a letter is left outside.',
      },
      {
        icon: 'scan',
        title: 'On-device detection',
        copy: 'Smart detect and Detect faces run locally. The image never leaves the phone.',
      },
      {
        icon: 'download',
        title: 'Share from Downloads',
        copy: 'Export PNG, JPG, or WebP and share that copy instead of the original from Gallery.',
      },
      {
        icon: 'wifi-off',
        title: 'Works offline',
        copy: 'After the page has loaded, manual redaction and export keep working without a connection.',
      },
      {
        icon: 'lock',
        title: 'No account',
        copy: 'No sign-in, no install, no watermark, and no upload endpoint.',
      },
    ],
  },
  steps: {
    eyebrow: 'On Android',
    title: 'Redact a screenshot on Android in four steps',
    items: [
      {
        title: 'Take the screenshot',
        copy: 'Press Power + Volume Down (the exact combo varies by maker). The shot appears in the notification shade and in Photos or Gallery.',
      },
      {
        title: 'Open Chrome and load the shot',
        copy: 'Tap Choose a file, then Images/Photos or Files, and pick the screenshot. On some phones the picker labels these “Recent”.',
      },
      {
        title: 'Cover the identifiers',
        copy: 'Ink for names, emails, cards, and IDs. Drag with one finger, pinch to zoom, and use Smart detect for a first pass if the page has loaded the model.',
      },
      {
        title: 'Download and share the copy',
        copy: 'Tap Download. The file goes to Downloads; open it from the notification or the Files app and share that copy — not the original from Gallery.',
      },
    ],
  },
  safety: {
    title: 'Gallery markup is a scribble, not a guarantee',
    text: 'Google Photos, Samsung Gallery, and other editors offer pens and highlighters. They are useful for a quick note, but they do not promise that the pixels underneath are gone, and they may keep the original file’s metadata. Use an opaque box here and share the exported copy.',
  },
  checklist: {
    title: 'Before you share from Android',
    items: [
      'Status bar details you meant to hide: carrier, account name, or an unusual icon.',
      'Notification previews and message banners.',
      'Google account avatar, profile chip, and workspace name.',
      'The URL bar, tab count, and any open tab titles.',
      'Chat names, addresses, order numbers, and QR codes.',
      'Location pins, maps, and timestamps that reveal a routine.',
      'The file name if it includes a person or a project.',
      'The original screenshot is still in Gallery — share the export, not the original.',
    ],
  },
  faqs: [
    {
      question: 'How do I redact a screenshot on Android?',
      answer:
        'Take the screenshot, open this page in Chrome, choose the image from Photos or Files, cover the sensitive areas with ink, run Verify, and download the clean copy.',
    },
    {
      question: 'Does it work on Samsung, Pixel, and Xiaomi phones?',
      answer:
        'Yes. The editor runs in the browser, so the phone maker does not matter as long as Chrome is up to date. The capture buttons and the save flow can differ slightly.',
    },
    {
      question: 'Where do downloads go on Android?',
      answer:
        'Usually to the Downloads folder. Open the notification that appears after the download, or use the Files app, and share the new file from there.',
    },
    {
      question: 'Can I use Google Photos markup instead?',
      answer:
        'You can, but a highlighter or pen is easy to make translucent and does not remove the original pixels or metadata. For anything sensitive, use an opaque box and export a new file.',
    },
    {
      question: 'Does sharing as a document keep metadata?',
      answer:
        'Often yes. Sending a photo as a normal photo usually recompresses it and drops much of the metadata; sending it as a document can preserve the original. Clean the file before either path.',
    },
    {
      question: 'Does it work offline?',
      answer:
        'Manual redaction and export work after the page has loaded. Smart detection needs its OCR model on first use, so do that once while connected if you plan to work offline.',
    },
  ],
  related: [
    {
      href: '/redact-screenshot',
      label: 'All devices',
      title: 'Redact a screenshot',
      copy: 'The full checklist for names, emails, notifications, tabs, and URLs.',
    },
    {
      href: '/redact-screenshot-iphone',
      label: 'iPhone',
      title: 'Redact a screenshot on iPhone',
      copy: 'The same workflow in Safari, with the save-to-Photos steps.',
    },
    {
      href: '/remove-exif-data',
      label: 'Metadata',
      title: 'Remove EXIF data',
      copy: 'Strip GPS and camera details from a photo before it goes into a chat.',
    },
  ],
  cta: {
    eyebrow: 'Android, Chrome',
    title: 'Share the copy, not the original.',
    copy: 'Open the editor, choose the screenshot, and export a clean image. No app, no account, no upload.',
    primary: 'Open the editor',
    primaryHref: '#editor',
    secondary: 'Redact a screenshot',
    secondaryHref: '/redact-screenshot',
  },
};

export const removeExifData: ToolPageContent = {
  meta: {
    title: 'Remove EXIF Data from Photos Online — Free, Private | Redact',
    description:
      'Strip GPS, camera, date, and software metadata from JPG, PNG, and WebP photos in your browser. Free, no upload, no account.',
    keywords: [
      'remove exif data',
      'remove exif from photo',
      'strip metadata from image',
      'remove gps from photo',
      'exif remover online',
      'remove photo metadata',
    ],
  },
  hero: {
    eyebrow: 'Photo metadata',
    title: 'Remove EXIF data before you share the photo.',
    lead: 'A photo can carry GPS coordinates, a camera serial number, timestamps, and editing history. Rebuild it from pixels in your browser and leave that hidden layer behind.',
    primary: 'Remove metadata',
    primaryHref: '#metadata-remover',
    secondary: 'What EXIF reveals',
    secondaryHref: '#exif-list',
    proof: ['Free', 'No upload', 'No account', 'JPG, PNG, WebP'],
  },
  editor: 'metadata',
  intro: {
    eyebrow: 'What is in a photo',
    title: 'The picture is the point. The metadata is not.',
    paragraphs: [
      'EXIF is the block of information a camera or phone writes into a photo: when it was taken, which device and lens, the exposure, and often the GPS coordinates. XMP and IPTC can add editing history, captions, keywords, and rights information.',
      'Most apps hide all of this behind an “info” panel. When you send the original file — as an email attachment, a cloud link, or a chat “document” — the metadata usually travels with it. Re-encoding the visible pixels into a new file is the reliable way to drop it.',
      'Use the remover above for a quick clean copy. Use the redaction editor when the photo also contains something visible that should not be shared, such as a name badge, a screen, or an address on a parcel.',
    ],
  },
  features: {
    id: 'exif-list',
    eyebrow: 'What it can contain',
    title: 'The hidden data in a photo',
    copy: 'None of this appears in the picture, which is why it is so easy to forget.',
    items: [
      {
        icon: 'map-pin',
        title: 'GPS coordinates',
        copy: 'Where the photo was taken, often accurate to a few metres.',
      },
      {
        icon: 'monitor',
        title: 'Device and lens',
        copy: 'Make, model, lens, serial number, and firmware can identify the exact camera.',
      },
      {
        icon: 'clock',
        title: 'Date and time',
        copy: 'When it was captured, which can reveal routines, trips, or a location after the fact.',
      },
      {
        icon: 'code',
        title: 'Software history',
        copy: 'Editors and apps can leave a trail of what was changed and when.',
      },
      {
        icon: 'eye-off',
        title: 'Thumbnails',
        copy: 'An embedded preview can survive edits and show an earlier version of the scene.',
      },
      {
        icon: 'lock',
        title: 'Hidden, not visible',
        copy: 'The file keeps it in the background while the photo looks completely ordinary.',
      },
    ],
  },
  steps: {
    eyebrow: 'How it works',
    title: 'Strip metadata in three steps',
    items: [
      {
        title: 'Add the original photo',
        copy: 'Drop a JPG, PNG, WebP, GIF, BMP, or AVIF (up to 25 MB). The file is decoded locally.',
      },
      {
        title: 'Rebuild the pixels',
        copy: 'The tool paints the image onto a canvas and encodes a fresh file. Metadata blocks are not part of the pixels, so they are not copied.',
      },
      {
        title: 'Download and check',
        copy: 'Save the new file and check its properties. The picture should look the same; the GPS, camera, and date fields should be gone.',
      },
    ],
  },
  safety: {
    title: 'Screenshots have metadata too',
    text: 'A screenshot has no GPS fix and no lens, but it can still carry a device name, a software version, a timestamp, and the original colour profile. Re-encoding drops those and writes a fresh sRGB profile. It also flattens animated images to the first frame, so keep the original if the motion matters.',
  },
  checklist: {
    title: 'What the clean export leaves behind',
    items: [
      'GPS latitude, longitude, altitude, and direction.',
      'Camera make, model, lens, serial number, and firmware.',
      'Capture date and time, including time-zone offsets.',
      'Software and editing history, plus XMP and IPTC blocks.',
      'Embedded thumbnails that may show an earlier version of the scene.',
      'The original file name and folder path, where the format stores them.',
      'Not removed: what is visible in the picture. Redact names, screens, and documents separately.',
    ],
  },
  faqs: [
    {
      question: 'Does editing a photo remove EXIF?',
      answer:
        'Not necessarily. Cropping or applying a filter can keep the original metadata block and even add to it. Exporting a new file from a canvas is what drops it; this tool does that explicitly.',
    },
    {
      question: 'Is the photo uploaded?',
      answer:
        'No. The browser reads the file and draws it to a local canvas. There is no upload endpoint, and the download is created in the tab.',
    },
    {
      question: 'Which formats are supported?',
      answer:
        'JPG, PNG, WebP, GIF, BMP, and AVIF up to 25 MB. JPG, PNG, and WebP keep their format; GIF, BMP, and AVIF are exported as PNG, and animations are flattened to the first frame.',
    },
    {
      question: 'Does it remove GPS from an iPhone photo?',
      answer:
        'Yes, when the photo is exported through the tool. iPhone photos often carry GPS. If you share from Photos with “All Photos Data” enabled, the location can travel too; share the clean export instead.',
    },
    {
      question: 'Does WhatsApp remove EXIF?',
      answer:
        'Sending a photo as a normal photo usually strips most metadata because the app recompresses it. Sending it as a document can preserve the original. Do not rely on a chat app’s behaviour; clean the file first.',
    },
    {
      question: 'Will I lose image quality?',
      answer:
        'PNG is lossless. JPG and WebP are re-encoded at high quality, so there can be a small generational loss. The visible difference is usually negligible, and the metadata removal is the point.',
    },
    {
      question: 'Can I remove metadata from a PDF?',
      answer:
        'The redaction editor rebuilds PDF pages as images, which drops the original text layer, links, forms, and document metadata. The metadata remover above is for images only.',
    },
  ],
  related: [
    {
      href: '/redact-screenshot',
      label: 'Screenshots',
      title: 'Redact a screenshot',
      copy: 'Metadata is only half the story. Cover the names, emails, and account chips too.',
    },
    {
      href: '/blur-text-in-image',
      label: 'Blur text',
      title: 'Blur text in an image',
      copy: 'A quick way to soften a name or background detail — and when to use ink instead.',
    },
    {
      href: '/guides/how-to-redact-a-screenshot',
      label: 'Guide',
      title: 'How to redact a screenshot',
      copy: 'A repeatable pass for the details people usually miss.',
    },
  ],
  cta: {
    eyebrow: 'One clean copy',
    title: 'Keep the picture. Leave the hidden history.',
    copy: 'Open the remover, drop the original photo, and download a freshly encoded copy. No account, no upload, no watermark.',
    primary: 'Remove metadata',
    primaryHref: '#metadata-remover',
    secondary: 'Redact a screenshot',
    secondaryHref: '/redact-screenshot',
  },
};

export const toolPages = {
  'blur-text-in-image': blurTextInImage,
  'redact-screenshot': redactScreenshot,
  'redact-screenshot-iphone': redactScreenshotIphone,
  'redact-screenshot-mac': redactScreenshotMac,
  'redact-screenshot-windows': redactScreenshotWindows,
  'redact-screenshot-android': redactScreenshotAndroid,
  'remove-exif-data': removeExifData,
} satisfies Record<string, ToolPageContent>;

export type ToolPageSlug = keyof typeof toolPages;
