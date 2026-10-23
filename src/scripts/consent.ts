/**
 * Consent banner and Google Consent Mode v2 bridge.
 *
 * The choice is stored in localStorage rather than a cookie, so the banner
 * itself adds no tracking surface. The AdSense loader reads the same record
 * before it runs, which keeps the default state in sync on repeat visits.
 */
const STORAGE_KEY = 'ir-consent-v1';
const VERSION = 1;

type Choice = 'granted' | 'denied';

interface StoredChoice {
  version: number;
  choice: Choice;
  savedAt: string;
}

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

function readChoice(): Choice | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<StoredChoice>;
    if (parsed.version !== VERSION) return null;
    return parsed.choice === 'granted' || parsed.choice === 'denied' ? parsed.choice : null;
  } catch {
    return null;
  }
}

function saveChoice(choice: Choice): void {
  try {
    const record: StoredChoice = {
      version: VERSION,
      choice,
      savedAt: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(record));
  } catch {
    /* Storage blocked. The choice still applies to this page view. */
  }
}

function updateGoogleConsent(choice: Choice): void {
  const state = choice === 'granted' ? 'granted' : 'denied';
  window.gtag?.('consent', 'update', {
    ad_storage: state,
    ad_user_data: state,
    ad_personalization: state,
    analytics_storage: 'denied',
  });
  window.dispatchEvent(
    new CustomEvent('redact-consent-change', { detail: { choice } }),
  );
}

const banner = document.querySelector<HTMLElement>('[data-consent-banner]');

if (banner) {
  const accept = banner.querySelector<HTMLButtonElement>('[data-consent-accept]');
  const reject = banner.querySelector<HTMLButtonElement>('[data-consent-reject]');
  const openers = Array.from(
    document.querySelectorAll<HTMLButtonElement>('[data-consent-open]'),
  );

  const show = (moveFocus = false): void => {
    banner.hidden = false;
    if (moveFocus) accept?.focus();
  };

  const hide = (): void => {
    banner.hidden = true;
  };

  const choose = (choice: Choice): void => {
    saveChoice(choice);
    updateGoogleConsent(choice);
    hide();
  };

  accept?.addEventListener('click', () => choose('granted'));
  reject?.addEventListener('click', () => choose('denied'));

  for (const opener of openers) {
    opener.addEventListener('click', () => show(true));
  }

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !banner.hidden) hide();
  });

  const stored = readChoice();
  if (stored === null) {
    show();
  } else {
    // The loader already read this value; this keeps the event stream complete
    // for any other consent-aware tooling added later.
    updateGoogleConsent(stored);
  }
}
