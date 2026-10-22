/**
 * PWA wiring: registers the service worker in production builds and lights up
 * the install button when the browser offers a native install prompt.
 *
 * The install event can fire before this module is attached, so BaseLayout
 * stashes it on `window.__redactInstallPrompt` and announces it with a custom
 * event. This module reads the stash first, then keeps listening.
 */
interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
  prompt(): Promise<void>;
}

declare global {
  interface Window {
    __redactInstallPrompt?: BeforeInstallPromptEvent;
  }
}

const installButtons = Array.from(
  document.querySelectorAll<HTMLButtonElement>('[data-install-app]')
);

function syncInstallButtons(): void {
  const available = Boolean(window.__redactInstallPrompt);
  for (const button of installButtons) {
    button.hidden = !available;
  }
}

async function install(): Promise<void> {
  const prompt = window.__redactInstallPrompt;
  if (!prompt) return;

  // The event is single-use. Clear it before awaiting so a double click cannot
  // call prompt() twice.
  window.__redactInstallPrompt = undefined;
  syncInstallButtons();

  try {
    await prompt.prompt();
    await prompt.userChoice;
  } catch (error) {
    console.warn('[pwa] the install prompt could not be shown.', error);
  }
}

for (const button of installButtons) {
  button.addEventListener('click', () => void install());
}

window.addEventListener('beforeinstallprompt', (event) => {
  event.preventDefault();
  window.__redactInstallPrompt = event as BeforeInstallPromptEvent;
  syncInstallButtons();
});

window.addEventListener('redact-install-ready', syncInstallButtons);
window.addEventListener('appinstalled', () => {
  window.__redactInstallPrompt = undefined;
  syncInstallButtons();
});

syncInstallButtons();

if (import.meta.env.PROD && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch((error) => {
      console.warn('[pwa] the offline worker could not be registered.', error);
    });
  });
}
