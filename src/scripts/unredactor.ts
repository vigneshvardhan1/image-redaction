import {
  detectRedactionAreas,
  type DetectionSensitivity,
  type DetectedArea,
} from './redaction-detect';
import { inpaintAreas } from './inpaint';

const root = document.querySelector<HTMLElement>('[data-unredactor]');

if (root) {
  setup(root);
}

interface RepairBox extends DetectedArea {
  id: number;
  selected: boolean;
  source: 'auto' | 'manual';
}

function setup(editor: HTMLElement) {
  function query<T extends Element>(selector: string): T {
    const node = editor.querySelector<T>(selector);
    if (!node) throw new Error(`Missing unredactor element: ${selector}`);
    return node;
  }

  const canvas = query<HTMLCanvasElement>('[data-ucanvas]');
  const frame = query<HTMLElement>('[data-ucanvas-frame]');
  const overlay = query<HTMLElement>('[data-uoverlay]');
  const dropzone = query<HTMLElement>('[data-udropzone]');
  const workspace = query<HTMLElement>('[data-uworkspace]');
  const fileInput = query<HTMLInputElement>('[data-ufile-input]');
  const filenameEl = query<HTMLElement>('[data-ufilename]');
  const sizeEl = query<HTMLElement>('[data-uimage-size]');
  const toastEl = query<HTMLElement>('[data-utoast]');
  const countEl = query<HTMLElement>('[data-ucount]');
  const countLabel = query<HTMLElement>('[data-ucount-label]');
  const statusEl = query<HTMLElement>('[data-ustatus]');
  const busyOverlay = query<HTMLElement>('[data-ubusy]');
  const busyLabel = query<HTMLElement>('[data-ubusy-label]');
  const originalBadge = query<HTMLElement>('[data-uoriginal-badge]');
  const repairedBadge = query<HTMLElement>('[data-urepaired-badge]');
  const suggestions = query<HTMLElement>('[data-usuggestions]');
  const ghost = query<HTMLElement>('[data-ughost]');
  const banner = query<HTMLElement>('[data-ubanner]');
  const bannerTitle = query<HTMLElement>('[data-ubanner-title]');
  const bannerSub = query<HTMLElement>('[data-ubanner-sub]');
  const detectBtn = query<HTMLButtonElement>('[data-uaction="detect"]');
  const repairBtn = query<HTMLButtonElement>('[data-uaction="repair"]');
  const compareBtn = query<HTMLButtonElement>('[data-uaction="compare"]');
  const resetBtn = query<HTMLButtonElement>('[data-uaction="reset"]');
  const downloadBtn = query<HTMLButtonElement>('[data-uaction="download"]');
  const sensitivitySelect = query<HTMLSelectElement>('[data-usensitivity]');
  const formatSelect = query<HTMLSelectElement>('[data-uformat]');

  const originalCanvas = document.createElement('canvas');
  const workingCanvas = document.createElement('canvas');

  let hasImage = false;
  let busy = false;
  let imageName = 'image';
  let boxes: RepairBox[] = [];
  let nextId = 1;
  let compare = false;
  let repaired = false;
  let totalRepaired = 0;
  let loadToken = 0;
  let draft: { x: number; y: number; w: number; h: number } | null = null;
  let drag: { startX: number; startY: number } | null = null;
  let raf = 0;
  let toastTimer = 0;

  function clamp(value: number, min: number, max: number): number {
    return Math.min(max, Math.max(min, value));
  }

  function toast(message: string): void {
    toastEl.textContent = message;
    toastEl.classList.add('is-visible');
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => {
      toastEl.classList.remove('is-visible');
    }, 4600);
  }

  function setBusy(active: boolean, label?: string): void {
    busy = active;
    busyOverlay.hidden = !active;
    editor.setAttribute('aria-busy', String(active));
    if (label) busyLabel.textContent = label;
    refreshChrome();
  }

  function nextFrame(): Promise<void> {
    return new Promise((resolve) => {
      requestAnimationFrame(() => {
        window.setTimeout(resolve, 24);
      });
    });
  }

  function editorInView(): boolean {
    const rect = editor.getBoundingClientRect();
    return rect.bottom > 0 && rect.top < window.innerHeight;
  }

  function selectedBoxes(): RepairBox[] {
    return boxes.filter((box) => box.selected);
  }

  function placed(element: HTMLElement, box: { x: number; y: number; w: number; h: number }): void {
    element.style.left = `${(box.x / workingCanvas.width) * 100}%`;
    element.style.top = `${(box.y / workingCanvas.height) * 100}%`;
    element.style.width = `${(box.w / workingCanvas.width) * 100}%`;
    element.style.height = `${(box.h / workingCanvas.height) * 100}%`;
  }

  function render(): void {
    if (!hasImage) return;
    const context = canvas.getContext('2d');
    if (!context) return;
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(compare ? originalCanvas : workingCanvas, 0, 0);
  }

  function updateBanner(): void {
    if (!hasImage) {
      banner.hidden = true;
      return;
    }
    if (repaired && boxes.length === 0) {
      banner.hidden = true;
      return;
    }

    banner.hidden = false;
    if (boxes.length > 0) {
      const count = boxes.length;
      bannerTitle.textContent = `${count} candidate bar${count === 1 ? '' : 's'} found`;
      bannerSub.textContent =
        'Click a mark to include or exclude it. Drag over anything the scan missed.';
    } else {
      bannerTitle.textContent = 'No solid bars found';
      bannerSub.textContent =
        'Drag over the redaction you want to repair, or switch sensitivity to Broad and scan again.';
    }
  }

  function refreshChrome(): void {
    const selected = selectedBoxes().length;
    const repairedView = repaired && boxes.length === 0;

    if (!hasImage) {
      countEl.textContent = '0';
      countLabel.textContent = 'areas selected';
    } else if (repairedView) {
      countEl.textContent = String(totalRepaired);
      countLabel.textContent = totalRepaired === 1 ? 'area repaired' : 'areas repaired';
    } else {
      countEl.textContent = String(selected);
      countLabel.textContent = selected === 1 ? 'area selected' : 'areas selected';
    }

    if (!hasImage) {
      statusEl.textContent = '';
    } else if (repairedView) {
      statusEl.textContent = 'Repair applied. Compare with the original.';
    } else if (boxes.length > 0) {
      statusEl.textContent = 'Review the marks, then remove the selected areas.';
    } else {
      statusEl.textContent = 'Drag over an area to mark it by hand.';
    }

    detectBtn.disabled = !hasImage || busy;
    repairBtn.disabled = selected === 0 || busy;
    repairBtn.textContent = `Remove ${selected} bar${selected === 1 ? '' : 's'}`;
    compareBtn.disabled = !repaired || busy;
    resetBtn.disabled = !hasImage || busy;
    downloadBtn.disabled = !repaired || busy;
    formatSelect.disabled = busy;

    compareBtn.setAttribute('aria-pressed', String(compare));
    originalBadge.hidden = !compare;
    repairedBadge.hidden = compare || !repaired;
    overlay.style.visibility = compare ? 'hidden' : '';

    updateBanner();
  }

  function renderBoxes(): void {
    suggestions.replaceChildren();
    if (!hasImage || compare) return;

    boxes.forEach((box, index) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'suggestion';
      button.dataset.excluded = String(!box.selected);
      button.dataset.kind = box.source;
      placed(button, box);
      button.setAttribute('aria-pressed', String(box.selected));
      const label = `${box.source === 'manual' ? 'Area' : 'Bar'} ${index + 1}`;
      button.setAttribute(
        'aria-label',
        `${box.selected ? 'Exclude' : 'Include'} ${label.toLowerCase()} from the repair`
      );
      button.title = box.selected ? `Exclude ${label}` : `Include ${label}`;

      const tag = document.createElement('span');
      tag.className = 'suggestion-tag';
      tag.textContent = box.selected ? label : `${label} (excluded)`;
      button.appendChild(tag);

      button.addEventListener('click', () => {
        box.selected = !box.selected;
        renderBoxes();
        refreshChrome();
      });

      suggestions.appendChild(button);
    });
  }

  function setCompare(next: boolean): void {
    if (next && !repaired) return;
    compare = next;
    render();
    renderBoxes();
    refreshChrome();
  }

  function pointFromEvent(event: { clientX: number; clientY: number }): { x: number; y: number } {
    const rect = canvas.getBoundingClientRect();
    if (!rect.width || !rect.height) return { x: 0, y: 0 };
    return {
      x: clamp(((event.clientX - rect.left) / rect.width) * workingCanvas.width, 0, workingCanvas.width),
      y: clamp(
        ((event.clientY - rect.top) / rect.height) * workingCanvas.height,
        0,
        workingCanvas.height
      ),
    };
  }

  function updateGhost(): void {
    if (!draft || !draft.w || !draft.h) {
      ghost.hidden = true;
      return;
    }
    ghost.hidden = false;
    placed(ghost, draft);
  }

  function scheduleRender(): void {
    if (!hasImage || raf) return;
    raf = requestAnimationFrame(() => {
      raf = 0;
      render();
    });
  }

  function detectOnDevice(): void {
    if (!hasImage || busy) return;
    void runDetection();
  }

  async function runDetection(): Promise<void> {
    if (!hasImage || busy) return;
    const token = loadToken;
    setBusy(true, 'Looking for solid bars…');
    await nextFrame();
    if (token !== loadToken) return;

    try {
      const maxEdge = 2200;
      const scale = Math.min(1, maxEdge / Math.max(workingCanvas.width, workingCanvas.height));
      const detectCanvas = document.createElement('canvas');
      detectCanvas.width = Math.max(1, Math.round(workingCanvas.width * scale));
      detectCanvas.height = Math.max(1, Math.round(workingCanvas.height * scale));
      const detectContext = detectCanvas.getContext('2d', { willReadFrequently: true });
      if (!detectContext) throw new Error('Canvas is unavailable');

      detectContext.drawImage(workingCanvas, 0, 0, detectCanvas.width, detectCanvas.height);
      const imageData = detectContext.getImageData(0, 0, detectCanvas.width, detectCanvas.height);
      const sensitivity = sensitivitySelect.value as DetectionSensitivity;
      const found = detectRedactionAreas(
        {
          width: imageData.width,
          height: imageData.height,
          data: imageData.data,
        },
        sensitivity
      );

      const scaleX = workingCanvas.width / detectCanvas.width;
      const scaleY = workingCanvas.height / detectCanvas.height;
      const manual = boxes.filter((box) => box.source === 'manual');
      const detected: RepairBox[] = [];

      for (const area of found) {
        const x = Math.max(0, Math.floor(area.x * scaleX) - 2);
        const y = Math.max(0, Math.floor(area.y * scaleY) - 2);
        const right = Math.min(workingCanvas.width, Math.ceil((area.x + area.w) * scaleX) + 2);
        const bottom = Math.min(workingCanvas.height, Math.ceil((area.y + area.h) * scaleY) + 2);
        if (right - x < 6 || bottom - y < 6) continue;
        detected.push({
          id: nextId++,
          x,
          y,
          w: right - x,
          h: bottom - y,
          fill: area.fill,
          selected: true,
          source: 'auto',
        });
      }

      boxes = [...detected, ...manual];
      compare = false;
      renderBoxes();
      refreshChrome();
      scheduleRender();
      toast(
        detected.length > 0
          ? `${detected.length} candidate bar${detected.length === 1 ? '' : 's'} found. Review the marks before repairing.`
          : 'No solid bars found. Drag over the redaction to mark it by hand.'
      );
    } catch (error) {
      console.error(error);
      toast('The on-device scan could not finish. Mark the area by hand instead.');
    } finally {
      setBusy(false);
    }
  }

  function applyImage(image: HTMLImageElement, name: string): void {
    const naturalWidth = image.naturalWidth || image.width;
    const naturalHeight = image.naturalHeight || image.height;
    if (!naturalWidth || !naturalHeight) {
      toast('That file could not be read as an image. Try a PNG or JPG.');
      return;
    }

    const scale = Math.min(1, 5200 / Math.max(naturalWidth, naturalHeight));
    const width = Math.max(1, Math.round(naturalWidth * scale));
    const height = Math.max(1, Math.round(naturalHeight * scale));

    originalCanvas.width = width;
    originalCanvas.height = height;
    const originalContext = originalCanvas.getContext('2d');
    if (!originalContext) {
      toast('Canvas is unavailable in this browser.');
      return;
    }
    originalContext.fillStyle = '#ffffff';
    originalContext.fillRect(0, 0, width, height);
    originalContext.imageSmoothingQuality = 'high';
    originalContext.drawImage(image, 0, 0, width, height);

    workingCanvas.width = width;
    workingCanvas.height = height;
    const workingContext = workingCanvas.getContext('2d');
    if (!workingContext) {
      toast('Canvas is unavailable in this browser.');
      return;
    }
    workingContext.drawImage(originalCanvas, 0, 0);

    canvas.width = width;
    canvas.height = height;

    hasImage = true;
    imageName = name;
    boxes = [];
    nextId = 1;
    repaired = false;
    totalRepaired = 0;
    compare = false;
    busy = false;
    draft = null;
    drag = null;
    ghost.hidden = true;
    loadToken += 1;

    filenameEl.textContent = name;
    filenameEl.title = name;
    sizeEl.textContent = `${width} × ${height}`;
    sizeEl.title =
      scale < 1 ? `Original: ${naturalWidth} × ${naturalHeight}. Downscaled for memory.` : '';
    dropzone.hidden = true;
    workspace.hidden = false;
    busyOverlay.hidden = true;
    banner.hidden = true;
    render();
    refreshChrome();
    toast('Image loaded. It never left your device.');

    window.setTimeout(() => {
      detectOnDevice();
    }, 80);
  }

  async function loadFile(file: File): Promise<void> {
    if (!/^image\/(png|jpeg|webp|gif|bmp|avif)$/i.test(file.type)) {
      toast('Use a PNG, JPG, WebP, GIF, BMP, or AVIF image.');
      return;
    }
    if (file.size > 25 * 1024 * 1024) {
      toast('That image is larger than 25 MB. Try a smaller file.');
      return;
    }

    const url = URL.createObjectURL(file);
    try {
      const image = await loadImage(url);
      if (hasImage) toast('Replaced the previous image.');
      applyImage(image, file.name || 'redacted-image.png');
    } catch {
      toast('That file could not be read as an image. Try a PNG or JPG.');
    } finally {
      URL.revokeObjectURL(url);
    }
  }

  function loadImage(source: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.decoding = 'async';
      image.onload = () => resolve(image);
      image.onerror = () => reject(new Error('Image could not be decoded'));
      image.src = source;
    });
  }

  async function loadSample(source: string, name: string): Promise<void> {
    try {
      const image = await loadImage(source);
      applyImage(image, name);
    } catch {
      toast('The redacted sample could not load. Try your own image.');
    }
  }

  async function repair(): Promise<void> {
    const chosen = selectedBoxes();
    if (!hasImage || busy || chosen.length === 0) return;
    const token = loadToken;

    setBusy(true, 'Rebuilding the covered areas…');
    await nextFrame();
    if (token !== loadToken) return;

    try {
      const context = workingCanvas.getContext('2d', { willReadFrequently: true });
      if (!context) throw new Error('Canvas is unavailable');
      const imageData = context.getImageData(0, 0, workingCanvas.width, workingCanvas.height);
      const repairedCount = inpaintAreas(imageData, chosen, 2);
      context.putImageData(imageData, 0, 0);

      if (repairedCount > 0) totalRepaired += repairedCount;
      repaired = repairedCount > 0;
      compare = false;
      boxes = [];
      ghost.hidden = true;
      draft = null;
      render();
      renderBoxes();
      refreshChrome();
      toast(
        `${repairedCount} area${repairedCount === 1 ? '' : 's'} repaired. The fill is reconstructed from nearby pixels — not recovered.`
      );
    } catch (error) {
      console.error(error);
      toast('The repair could not finish. Try a smaller image or select fewer areas.');
    } finally {
      setBusy(false);
    }
  }

  function reset(): void {
    if (!hasImage || busy) return;
    const context = workingCanvas.getContext('2d');
    if (!context) return;
    context.clearRect(0, 0, workingCanvas.width, workingCanvas.height);
    context.drawImage(originalCanvas, 0, 0);

    repaired = false;
    totalRepaired = 0;
    compare = false;
    boxes = [];
    draft = null;
    ghost.hidden = true;
    render();
    renderBoxes();
    refreshChrome();
    toast('Reset to the original image.');
    window.setTimeout(() => {
      detectOnDevice();
    }, 80);
  }

  function baseName(): string {
    const cleaned = imageName
      .replace(/\.[^.]+$/, '')
      .replace(/[^a-z0-9-_]+/gi, '-')
      .replace(/^-+|-+$/g, '')
      .toLowerCase();
    return cleaned || 'image';
  }

  function toBlob(source: HTMLCanvasElement, type: string): Promise<Blob> {
    return new Promise((resolve, reject) => {
      source.toBlob(
        (blob) => {
          if (blob) resolve(blob);
          else reject(new Error('Could not encode the image'));
        },
        type,
        type === 'image/png' ? undefined : 0.92
      );
    });
  }

  async function download(): Promise<void> {
    if (!hasImage || !repaired) {
      toast('Repair at least one area before downloading.');
      return;
    }
    try {
      const type = formatSelect.value;
      const extension = type === 'image/jpeg' ? 'jpg' : type === 'image/webp' ? 'webp' : 'png';
      const output = document.createElement('canvas');
      output.width = workingCanvas.width;
      output.height = workingCanvas.height;
      const context = output.getContext('2d');
      if (!context) throw new Error('Canvas is unavailable');
      if (type === 'image/jpeg') {
        context.fillStyle = '#ffffff';
        context.fillRect(0, 0, output.width, output.height);
      }
      context.drawImage(workingCanvas, 0, 0);

      const blob = await toBlob(output, type);
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${baseName()}-repaired.${extension}`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.setTimeout(() => URL.revokeObjectURL(url), 1200);
      toast('Downloaded. EXIF, GPS, and other metadata are stripped.');
    } catch (error) {
      console.error(error);
      toast('The download could not be created. Try PNG instead.');
    }
  }

  // --- Event wiring -------------------------------------------------------

  editor.querySelectorAll<HTMLElement>('[data-uopen-file]').forEach((button) => {
    button.addEventListener('click', () => fileInput.click());
  });

  fileInput.addEventListener('change', () => {
    const file = fileInput.files?.[0];
    fileInput.value = '';
    if (file) void loadFile(file);
  });

  editor.querySelectorAll<HTMLButtonElement>('[data-unredact-sample]').forEach((button) => {
    button.addEventListener('click', async () => {
      const source = button.dataset.unredactSample;
      if (!source) return;
      button.disabled = true;
      button.setAttribute('aria-busy', 'true');
      await loadSample(source, button.dataset.unredactSampleName || 'Redacted sample');
      button.disabled = false;
      button.removeAttribute('aria-busy');
    });
  });

  detectBtn.addEventListener('click', detectOnDevice);
  repairBtn.addEventListener('click', () => void repair());
  compareBtn.addEventListener('click', () => setCompare(!compare));
  resetBtn.addEventListener('click', reset);
  downloadBtn.addEventListener('click', () => void download());
  sensitivitySelect.addEventListener('change', detectOnDevice);

  canvas.addEventListener('pointerdown', (event) => {
    if (!hasImage || busy) return;
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    if (compare) setCompare(false);
    event.preventDefault();
    canvas.focus({ preventScroll: true });

    const point = pointFromEvent(event);
    draft = { x: point.x, y: point.y, w: 0, h: 0 };
    drag = { startX: point.x, startY: point.y };
    frame.classList.add('is-moving');
    updateGhost();
  });

  window.addEventListener(
    'pointermove',
    (event) => {
      if (!drag) return;
      event.preventDefault();
      const point = pointFromEvent(event);
      const x = Math.min(drag.startX, point.x);
      const y = Math.min(drag.startY, point.y);
      draft = {
        x,
        y,
        w: Math.abs(point.x - drag.startX),
        h: Math.abs(point.y - drag.startY),
      };
      updateGhost();
    },
    { passive: false }
  );

  function endDrag(): void {
    if (!drag) return;
    drag = null;
    frame.classList.remove('is-moving');
    ghost.hidden = true;
    const box = draft;
    draft = null;
    if (box && box.w >= 8 && box.h >= 8) {
      boxes.push({
        id: nextId++,
        x: box.x,
        y: box.y,
        w: box.w,
        h: box.h,
        fill: 1,
        selected: true,
        source: 'manual',
      });
      repaired = false;
      compare = false;
      renderBoxes();
      refreshChrome();
      scheduleRender();
      toast('Area marked. Remove the selected areas when you are ready.');
    }
  }

  window.addEventListener('pointerup', endDrag);
  window.addEventListener('pointercancel', endDrag);

  document.addEventListener('keydown', (event) => {
    if (!hasImage || !editorInView()) return;
    const target = event.target as HTMLElement | null;
    if (target?.matches('input, textarea, select, [contenteditable="true"]')) return;

    if (event.key === 'Escape') {
      drag = null;
      draft = null;
      ghost.hidden = true;
      frame.classList.remove('is-moving');
      return;
    }

    if (event.key.toLowerCase() === 'c' && repaired) {
      event.preventDefault();
      setCompare(!compare);
    }
  });

  ['dragenter', 'dragover'].forEach((type) => {
    dropzone.addEventListener(type, (event) => {
      if (hasImage) return;
      event.preventDefault();
      dropzone.classList.add('is-dragging');
      if (event instanceof DragEvent && event.dataTransfer) {
        event.dataTransfer.dropEffect = 'copy';
      }
    });
  });

  ['dragleave', 'dragend'].forEach((type) => {
    dropzone.addEventListener(type, () => {
      dropzone.classList.remove('is-dragging');
    });
  });

  dropzone.addEventListener('drop', (event) => {
    event.preventDefault();
    dropzone.classList.remove('is-dragging');
    if (hasImage) return;
    const file = event.dataTransfer?.files?.[0];
    if (file) void loadFile(file);
  });

  refreshChrome();
  setBusy(false);
}
