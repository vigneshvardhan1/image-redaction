export type RedactionModeId = 'ink' | 'pixelate' | 'blur' | 'emoji';

export interface RedactionMode {
  id: RedactionModeId;
  icon: string;
  title: string;
  shortTitle: string;
  badge: string;
  /** What the style does to the pixels — the "how this becomes what" line. */
  guide: string;
  /** When to reach for it. */
  copy: string;
  alt: string;
}

export const redactionModes: RedactionMode[] = [
  {
    id: 'ink',
    icon: 'square',
    title: 'Ink black',
    shortTitle: 'Ink black',
    badge: 'Most secure',
    guide:
      'Solid pixels replace the photo, name, ID number, address, barcode and QR code. There is nothing behind the bar to read.',
    copy: 'The right default for card numbers, IDs, addresses and anything financial.',
    alt: 'The same student ID with the photo, name, date of birth, ID number, address, barcode, and QR code covered by opaque black bars.',
  },
  {
    id: 'pixelate',
    icon: 'pixelate',
    title: 'Pixelate',
    shortTitle: 'Pixelate',
    badge: 'Soft',
    guide:
      'Each covered area is sampled down to a handful of blocks. Letters collapse into flat colour, but the shape of the original still shows through.',
    copy: 'Fine for casual screenshots where a softer look fits.',
    alt: 'The same student ID with the photo, name, date of birth, ID number, address, barcode, and QR code covered by a chunky pixelated mosaic.',
  },
  {
    id: 'blur',
    icon: 'blur',
    title: 'Blur',
    shortTitle: 'Blur',
    badge: 'Soft',
    guide:
      'Pixels are averaged into a soft gradient. A face turns into a smudge, but a short password can still survive a careful look.',
    copy: 'Fine for faces and context, never the first choice for secrets.',
    alt: 'The same student ID with the photo, name, date of birth, ID number, address, barcode, and QR code covered by a soft photographic blur.',
  },
  {
    id: 'emoji',
    icon: 'emoji',
    title: 'Emoji sticker',
    shortTitle: 'Emoji',
    badge: 'Casual',
    guide:
      'An opaque plate is painted over the area and an emoji is dropped on top. The pixels underneath are gone for good.',
    copy: 'Friendly on a face, still fully covered.',
    alt: 'The same student ID with the photo, name, date of birth, ID number, address, barcode, and QR code covered by opaque white sticker plates with a sunglasses emoji.',
  },
];
