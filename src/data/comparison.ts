export interface ComparisonRow {
  feature: string;
  ours: string;
  web: string;
  desktop: string;
  note?: string;
}

export const comparisonRows: ComparisonRow[] = [
  {
    feature: 'Image leaves your device',
    ours: 'Never',
    web: 'Often uploaded',
    desktop: 'No',
    note: 'No upload endpoint exists in the editor.',
  },
  {
    feature: 'On-device sensitive-text detection',
    ours: 'Yes, OCR in the browser',
    web: 'Rare',
    desktop: 'Seldom',
  },
  {
    feature: 'Cover every detected line',
    ours: 'All text mode',
    web: 'Rare',
    desktop: 'Varies',
  },
  {
    feature: 'Redaction styles',
    ours: 'Ink, pixelate, blur, emoji',
    web: 'Usually blur or mosaic',
    desktop: 'Varies',
  },
  {
    feature: 'Rectangle and oval selections',
    ours: 'Both',
    web: 'Varies',
    desktop: 'Varies',
  },
  {
    feature: 'Move, resize, and undo',
    ours: 'Yes',
    web: 'Varies',
    desktop: 'Yes',
  },
  {
    feature: 'Re-scan the flattened result',
    ours: 'Yes, best-effort OCR',
    web: 'No',
    desktop: 'No',
  },
  {
    feature: 'EXIF, GPS, and device metadata',
    ours: 'Removed on export',
    web: 'Varies',
    desktop: 'Varies',
  },
  {
    feature: 'Export size reduction',
    ours: 'Yes, with a live estimate',
    web: 'Rare',
    desktop: 'Sometimes',
    note: 'Quality and longest-edge controls, measured before download.',
  },
  {
    feature: 'Account required',
    ours: 'No',
    web: 'Sometimes',
    desktop: 'Often',
  },
  {
    feature: 'Price',
    ours: 'Free',
    web: 'Free or paid',
    desktop: 'Paid',
  },
  {
    feature: 'Offline editing after load',
    ours: 'Yes',
    web: 'No',
    desktop: 'Yes',
  },
  {
    feature: 'Batch queue',
    ours: 'Not yet',
    web: 'Varies',
    desktop: 'Sometimes',
  },
];
