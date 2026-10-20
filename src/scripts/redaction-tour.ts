import { drawShape, type Mode } from './render';

/**
 * The proof section tours the same ID sample through all four redaction
 * styles. Ink black reuses the hand-tuned SVG that the rest of the site
 * already ships; the softer styles are baked in a canvas so the "after"
 * layer is a real flattening of the original pixels, not an overlay.
 */

const SOURCE = '/samples/id.svg';
const INK = '/samples/id-redacted.svg';
const WIDTH = 1200;
const HEIGHT = 800;
const DURATION = 5200;

/** The eight regions covered in /samples/id-redacted.svg. */
const REGIONS = [
  { x: 214, y: 242, w: 232, h: 294 },
  { x: 494, y: 258, w: 360, h: 52 },
  { x: 494, y: 334, w: 240, h: 32 },
  { x: 494, y: 380, w: 280, h: 32 },
  { x: 494, y: 424, w: 500, h: 34 },
  { x: 494, y: 500, w: 240, h: 32 },
  { x: 494, y: 596, w: 272, h: 70 },
  { x: 912, y: 552, w: 96, h: 96 },
] as const;

type Renderer = (mode: Mode) => string;

function createRenderer(image: HTMLImageElement): Renderer {
  const canvas = document.createElement('canvas');
  canvas.width = WIDTH;
  canvas.height = HEIGHT;
  const context = canvas.getContext('2d');
  const cache = new Map<Mode, string>();

  return (mode) => {
    if (mode === 'ink') return INK;

    const cached = cache.get(mode);
    if (cached) return cached;
    if (!context) return INK;

    context.clearRect(0, 0, WIDTH, HEIGHT);
    context.drawImage(image, 0, 0, WIDTH, HEIGHT);

    REGIONS.forEach((region, index) => {
      drawShape(context, image, {
        id: index,
        mode,
        kind: 'rect',
        ...region,
        emoji: '😎',
      });
    });

    const url = canvas.toDataURL('image/webp', 0.92);
    cache.set(mode, url);
    return url;
  };
}

function createTour(root: HTMLElement, render: Renderer): void {
  const tablist = root.querySelector<HTMLElement>('[role="tablist"]');
  const tabs = Array.from(root.querySelectorAll<HTMLButtonElement>('[data-tour-tab]'));
  const panel = root.querySelector<HTMLElement>('[role="tabpanel"]');
  const after = root.querySelector<HTMLImageElement>('[data-tour-after]');
  const afterWrap = root.querySelector<HTMLElement>('[data-tour-after-wrap]');
  const range = root.querySelector<HTMLInputElement>('[data-tour-range]');
  const handle = root.querySelector<HTMLElement>('[data-tour-handle]');
  const title = root.querySelector<HTMLElement>('[data-tour-title]');
  const guide = root.querySelector<HTMLElement>('[data-tour-guide]');
  const copy = root.querySelector<HTMLElement>('[data-tour-copy]');
  const badge = root.querySelector<HTMLElement>('[data-tour-badge]');
  const step = root.querySelector<HTMLElement>('[data-tour-step]');
  const toggle = root.querySelector<HTMLButtonElement>('[data-tour-toggle]');
  const toggleLabel = root.querySelector<HTMLElement>('[data-tour-toggle-label]');
  const playIcon = root.querySelector<HTMLElement>('[data-tour-play-icon]');
  const pauseIcon = root.querySelector<HTMLElement>('[data-tour-pause-icon]');

  if (
    !tablist ||
    !panel ||
    !after ||
    !afterWrap ||
    !range ||
    !handle ||
    !toggle ||
    tabs.length === 0
  ) {
    return;
  }

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let index = 0;
  let playing = !reduceMotion.matches;
  let visible = false;
  let frame = 0;
  let elapsed = 0;
  let last = 0;

  const setProgress = (value: number) => {
    const progress = Math.min(1, Math.max(0, value));
    tabs.forEach((tab, tabIndex) => {
      const bar = tab.querySelector<HTMLElement>('[data-tour-progress]');
      if (!bar) return;
      bar.style.transform = `scaleX(${tabIndex === index ? progress : 0})`;
    });
  };

  const updateCompare = () => {
    const value = Number(range.value);
    afterWrap.style.clipPath = `inset(0 0 0 ${value}%)`;
    handle.style.left = `${value}%`;
    const label = tabs[index]?.dataset.title?.toLowerCase() ?? 'redacted';
    range.setAttribute(
      'aria-valuetext',
      `${value}% original, ${100 - value}% ${label}`
    );
  };

  const setMode = (next: number) => {
    index = ((next % tabs.length) + tabs.length) % tabs.length;
    const active = tabs[index];
    const mode = (active.dataset.tourTab as Mode | undefined) ?? 'ink';

    tabs.forEach((tab, tabIndex) => {
      const selected = tabIndex === index;
      tab.setAttribute('aria-selected', String(selected));
      tab.tabIndex = selected ? 0 : -1;
    });

    root.dataset.mode = mode;
    panel.setAttribute('aria-labelledby', active.id);

    const source = render(mode);
    if (after.getAttribute('src') !== source) after.src = source;
    if (active.dataset.alt) after.alt = active.dataset.alt;

    if (title) title.textContent = active.dataset.title ?? '';
    if (guide) guide.textContent = active.dataset.guide ?? '';
    if (copy) copy.textContent = active.dataset.copy ?? '';
    if (badge) badge.textContent = active.dataset.badge ?? '';
    if (step) {
      step.textContent = `${String(index + 1).padStart(2, '0')} / ${String(tabs.length).padStart(2, '0')}`;
    }

    elapsed = 0;
    last = 0;
    setProgress(0);
    updateCompare();
  };

  const updateToggle = () => {
    root.dataset.playing = String(playing);
    toggle.setAttribute(
      'aria-label',
      playing ? 'Pause the style tour' : 'Play the style tour'
    );
    if (toggleLabel) toggleLabel.textContent = playing ? 'Pause' : 'Play';
    playIcon?.classList.toggle('hidden', playing);
    pauseIcon?.classList.toggle('hidden', !playing);
  };

  const canAnimate = () => playing && visible && !document.hidden;

  const tick = (now: number) => {
    frame = 0;
    if (!canAnimate()) return;

    if (!last) last = now;
    elapsed += Math.min(120, now - last);
    last = now;

    const progress = elapsed / DURATION;
    setProgress(progress);

    if (progress >= 1) {
      setMode(index + 1);
    }

    frame = requestAnimationFrame(tick);
  };

  const start = () => {
    if (frame) return;
    last = 0;
    frame = requestAnimationFrame(tick);
  };

  const stop = () => {
    if (frame) cancelAnimationFrame(frame);
    frame = 0;
    last = 0;
  };

  const sync = () => {
    if (canAnimate()) start();
    else stop();
  };

  const pause = () => {
    if (!playing) return;
    playing = false;
    sync();
    updateToggle();
  };

  const resume = () => {
    if (playing) return;
    playing = true;
    sync();
    updateToggle();
  };

  toggle.addEventListener('click', () => {
    if (playing) pause();
    else resume();
  });

  tabs.forEach((tab, tabIndex) => {
    tab.addEventListener('click', () => {
      pause();
      setMode(tabIndex);
    });
  });

  tablist.addEventListener('focusin', pause);

  // The style gallery hands its choice to the tour.
  root.addEventListener('redaction-tour:select', (event) => {
    const mode = (event as CustomEvent<{ mode?: string }>).detail?.mode;
    const target = tabs.findIndex((tab) => tab.dataset.tourTab === mode);
    if (target < 0) return;
    pause();
    setMode(target);
  });

  tablist.addEventListener('keydown', (event) => {
    let next = index;
    if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
    else if (event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = tabs.length - 1;
    else return;

    event.preventDefault();
    pause();
    setMode(next);
    tabs[next].focus();
  });

  range.addEventListener('input', updateCompare);
  range.addEventListener('pointerdown', pause);
  range.addEventListener('focus', pause);

  reduceMotion.addEventListener('change', (event) => {
    if (!event.matches) return;
    playing = false;
    sync();
    updateToggle();
  });

  document.addEventListener('visibilitychange', sync);

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        visible = entries.some((entry) => entry.isIntersecting);
        sync();
      },
      { threshold: 0.35 }
    );
    observer.observe(root);
  } else {
    visible = true;
    sync();
  }

  setMode(0);
  updateToggle();
}

const roots = Array.from(document.querySelectorAll<HTMLElement>('[data-tour-root]'));

if (roots.length) {
  const image = new Image();
  image.decoding = 'async';

  image.onload = () => {
    const render = createRenderer(image);

    roots.forEach((root) => createTour(root, render));

    // Bake the softer styles before the section is likely to be reached,
    // so switching tabs never waits on a canvas redraw.
    window.setTimeout(() => {
      (['pixelate', 'blur', 'emoji'] as Mode[]).forEach((mode) => render(mode));
    }, 600);
  };

  image.onerror = () => {
    console.error('The redaction tour sample failed to load.');
    roots.forEach((root) => createTour(root, () => INK));
  };

  image.src = SOURCE;
}
