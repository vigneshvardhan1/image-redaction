/**
 * Advertising configuration.
 *
 * Ads are entirely opt-in at build time. Leave PUBLIC_ADSENSE_CLIENT unset and
 * no AdSense script, consent banner, ad unit, or ads.txt entry is produced.
 * That keeps local builds and forks clean, and prevents a placeholder publisher
 * ID from ever being published by accident.
 */
const rawClient = (import.meta.env.PUBLIC_ADSENSE_CLIENT ?? '').trim();
const rawSlot = (value: string | undefined) => (value ?? '').trim();

// AdSense publisher IDs look like ca-pub-1234567890123456.
const clientIsValid = /^ca-pub-\d{16}$/.test(rawClient);

if (rawClient && !clientIsValid) {
  console.warn(
    '[ads] PUBLIC_ADSENSE_CLIENT is not a valid ca-pub-… ID. Advertising is disabled.',
  );
}

export const adsense = {
  enabled: clientIsValid,
  client: clientIsValid ? rawClient : '',
  slots: {
    home: rawSlot(import.meta.env.PUBLIC_ADSENSE_SLOT_HOME),
    article: rawSlot(import.meta.env.PUBLIC_ADSENSE_SLOT_ARTICLE),
    tool: rawSlot(import.meta.env.PUBLIC_ADSENSE_SLOT_TOOL),
  },
};

/** True when a slot ID looks usable rather than a placeholder. */
export function isAdSlot(value: string): boolean {
  return /^\d{6,}$/.test(value);
}
