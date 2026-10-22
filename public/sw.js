/* Redact service worker.
 *
 * The editor is entirely client side, so the app shell can keep working with
 * no network at all. Navigations use network-first so a fresh deploy is picked
 * up immediately; hashed build assets are cache-first because their names
 * change whenever their contents do. Nothing outside this origin is touched,
 * which keeps model downloads (Tesseract, MediaPipe) under the browser's own
 * cache rules.
 */
const SHELL_CACHE = 'redact-shell-v1';
const ASSET_CACHE = 'redact-assets-v1';

const PRECACHE = [
  '/',
  '/offline.html',
  '/manifest.webmanifest',
  '/favicon.svg',
  '/favicon.ico',
  '/apple-touch-icon.png',
  '/icon-192.png',
  '/icon-512.png',
  '/icon-maskable-192.png',
  '/icon-maskable-512.png',
];

const ASSET_PREFIXES = ['/_astro/', '/samples/', '/third-party/', '/pdfjs/'];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(SHELL_CACHE).then(async (cache) => {
      await Promise.allSettled(PRECACHE.map((url) => cache.add(url)));
      await self.skipWaiting();
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key.startsWith('redact-') && key !== SHELL_CACHE && key !== ASSET_CACHE)
            .map((key) => caches.delete(key))
        )
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener('message', (event) => {
  if (event.data === 'skip-waiting') void self.skipWaiting();
});

function isAsset(pathname) {
  return ASSET_PREFIXES.some((prefix) => pathname.startsWith(prefix));
}

async function cacheFirst(request) {
  const cache = await caches.open(ASSET_CACHE);
  const cached = await cache.match(request);
  if (cached) return cached;
  const response = await fetch(request);
  if (response.ok) void cache.put(request, response.clone());
  return response;
}

async function staleWhileRevalidate(request) {
  const cache = await caches.open(ASSET_CACHE);
  const cached = await cache.match(request);
  const network = fetch(request)
    .then((response) => {
      if (response.ok) void cache.put(request, response.clone());
      return response;
    })
    .catch(() => null);
  return cached || (await network) || Response.error();
}

async function navigationResponse(request) {
  const cache = await caches.open(ASSET_CACHE);
  try {
    const response = await fetch(request);
    if (response.ok) void cache.put(request, response.clone());
    return response;
  } catch {
    // Prefer the most recent online navigation over the install-time shell, so
    // an offline visit does not resurrect the first deployed HTML.
    const cached = await cache.match(request, { ignoreSearch: true });
    if (cached) return cached;
    const root = await cache.match('/');
    if (root) return root;
    const shellRoot = await caches.match('/');
    if (shellRoot) return shellRoot;
    const offline = await caches.match('/offline.html');
    if (offline) return offline;
    return new Response('You are offline. Reopen Redact once you are back online.', {
      status: 503,
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    });
  }
}

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;
  if (request.headers.has('range')) return;

  if (request.mode === 'navigate') {
    event.respondWith(navigationResponse(request));
    return;
  }

  if (isAsset(url.pathname)) {
    event.respondWith(cacheFirst(request));
    return;
  }

  event.respondWith(staleWhileRevalidate(request));
});
