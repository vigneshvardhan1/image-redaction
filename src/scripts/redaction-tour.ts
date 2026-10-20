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
/** Half the drag grip, so the handle never gets clipped by the frame. */
const GRIP = 22;
/** Below this the original is not really visible, so its label stays hidden. */
const BEFORE_LABEL = 12;

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
  const beforeChip = root.querySelector<HTMLElement>('[data-tour-before-chip]');
  const title = root.querySelector<HTMLElement>('[data-tour-title]');
  const guide = root.querySelector<HTMLElement>('[data-tour-guide]');
  const copy = root.querySelector<HTMLElement>('[data-tour-copy]');
  const badge = root.querySelector<HTMLElement>('[data-tour-badge]');
  const step = root.querySelector<HTMLElement>('[data-tour-step]');

  if (
    !tablist ||
    !panel ||
    !after ||
    !afterWrap ||
    !range ||
    !handle ||
    tabs.length === 0
  ) {
    return;
  }

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let index = 0;
  let visible = false;
  let frame = 0;
  let elapsed = 0;
  let last = 0;
  /** A keyboard visitor gets the tour held still while they read the tabs. */
  let held = false;

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

    const width = panel.getBoundingClientRect().width;
    const grip = Math.min(GRIP, Math.max(0, width / 2 - GRIP));
    const position = (value / 100) * width;
    handle.style.left = `${Math.min(Math.max(position, grip), Math.max(grip, width - grip))}px`;
    // The split line only means something once there is something to split.
    handle.style.backgroundColor = value > 1 ? '' : 'transparent';

    if (beforeChip) {
      beforeChip.style.opacity = value > BEFORE_LABEL ? '1' : '0';
    }

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

  const canAnimate = () =>
    !reduceMotion.matches && visible && !document.hidden && !held;

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

  tabs.forEach((tab, tabIndex) => {
    tab.addEventListener('click', () => {
      setMode(tabIndex);
    });
  });

  // The style gallery hands its choice to the tour.
  root.addEventListener('redaction-tour:select', (event) => {
    const mode = (event as CustomEvent<{ mode?: string }>).detail?.mode;
    const target = tabs.findIndex((tab) => tab.dataset.tourTab === mode);
    if (target < 0) return;
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
    setMode(next);
    tabs[next].focus();
  });

  // Hold the tour still while the tabs have keyboard focus, then let it run
  // again on the way out.
  tablist.addEventListener('focusin', () => {
    held = true;
    sync();
  });
  tablist.addEventListener('focusout', () => {
    held = false;
    sync();
  });

  range.addEventListener('input', updateCompare);

  // Pointing at the sample gives the current style a full run of the cycle.
  root.addEventListener('pointerenter', () => {
    elapsed = 0;
    last = 0;
    setProgress(0);
  });

  reduceMotion.addEventListener('change', sync);

  document.addEventListener('visibilitychange', sync);

  window.addEventListener('resize', updateCompare);

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
