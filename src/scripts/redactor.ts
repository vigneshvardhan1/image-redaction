import { renderScene, type Mode, type Shape, type ShapeKind } from './render';
import { scanCanvas, type Finding } from './detect';

const root = document.querySelector<HTMLElement>('[data-redactor]');

if (root) {
  setup(root);
}

function setup(editor: HTMLElement) {
  function query<T extends Element>(selector: string): T {
    const node = editor.querySelector<T>(selector);
    if (!node) throw new Error(`Missing editor element: ${selector}`);
    return node;
  }

  const canvas = query<HTMLCanvasElement>('[data-canvas]');
  const frame = query<HTMLElement>('[data-canvas-frame]');
  const overlay = query<HTMLElement>('[data-overlay]');
  const dropzone = query<HTMLElement>('[data-dropzone]');
  const workspace = query<HTMLElement>('[data-workspace]');
  const fileInput = query<HTMLInputElement>('[data-file-input]');
  const filenameEl = query<HTMLElement>('[data-filename]');
  const sizeEl = query<HTMLElement>('[data-image-size]');
  const toastEl = query<HTMLElement>('[data-toast]');
  const countEl = query<HTMLElement>('[data-count]');
  const countLabel = query<HTMLElement>('[data-count-label]');
  const busyOverlay = query<HTMLElement>('[data-busy]');
  const busyLabel = query<HTMLElement>('[data-busy-label]');
  const busyProgress = query<HTMLElement>('[data-busy-progress]');
  const verifyStatus = query<HTMLElement>('[data-verify-status]');
  const verifyText = query<HTMLElement>('[data-verify-text]');
  const originalBadge = query<HTMLElement>('[data-original-badge]');
  const ghost = query<HTMLElement>('[data-ghost]');
  const selection = query<HTMLElement>('[data-selection]');
  const suggestions = query<HTMLElement>('[data-suggestions]');
  const banner = query<HTMLElement>('[data-detect-banner]');
  const bannerTitle = query<HTMLElement>('[data-detect-title]');
  const bannerSub = query<HTMLElement>('[data-detect-sub]');
  const detectPrimary = query<HTMLButtonElement>('[data-detect-primary]');
  const detectAll = query<HTMLButtonElement>('[data-detect-all]');
  const detectDismiss = query<HTMLButtonElement>('[data-detect-dismiss]');
  const emojiPalette = query<HTMLElement>('[data-emoji-palette]');
  const undoBtn = query<HTMLButtonElement>('[data-action="undo"]');
  const redoBtn = query<HTMLButtonElement>('[data-action="redo"]');
  const clearBtn = query<HTMLButtonElement>('[data-action="clear"]');
  const compareBtn = query<HTMLButtonElement>('[data-action="compare"]');
  const downloadBtn = query<HTMLButtonElement>('[data-action="download"]');
  const copyBtn = query<HTMLButtonElement>('[data-action="copy"]');
  const verifyBtn = query<HTMLButtonElement>('[data-action="verify"]');
  const scanBtn = query<HTMLButtonElement>('[data-action="scan"]');
  const formatSelect = query<HTMLSelectElement>('[data-format]');
  const deleteSelectedBtn = query<HTMLButtonElement>('[data-delete-selected]');
  const sizePanel = query<HTMLElement>('[data-size-panel]');
  const sizeBtn = query<HTMLButtonElement>('[data-action="size"]');
  const sizeQuality = query<HTMLInputElement>('[data-size-quality]');
  const sizeQualityValue = query<HTMLOutputElement>('[data-size-quality-value]');
  const sizeMax = query<HTMLSelectElement>('[data-size-max]');
  const sizeNote = query<HTMLElement>('[data-size-note]');
  const sizeEstimate = query<HTMLElement>('[data-size-estimate]');
  const sizeSavings = query<HTMLElement>('[data-size-savings]');

  const baseCanvas = document.createElement('canvas');
  baseCanvas.width = 1;
  baseCanvas.height = 1;

  let hasImage = false;
  let imageName = 'image';
  let shapes: Shape[] = [];
  let selectedId: number | null = null;
  let nextId = 1;
  let history: Shape[][] = [[]];
  let historyIndex = 0;
  let findings: Finding[] = [];
  let findingSelected: boolean[] = [];
  let mode: Mode = 'ink';
  let shapeKind: ShapeKind = 'rect';
  let emoji = '😎';
  let busy = false;
  let compare = false;
  let reduceQuality = 0.92;
  let reduceMax = 0;
  let sizeTimer = 0;
  let draft: { x: number; y: number; w: number; h: number } | null = null;
  let drag: DragState | null = null;
  let raf = 0;
  let toastTimer = 0;
  let clearTimer = 0;

  type DragState =
    | { type: 'draw'; startX: number; startY: number; currentX: number; currentY: number }
    | {
        type: 'move';
        startX: number;
        startY: number;
        orig: Shape;
        moved: boolean;
      }
    | {
        type: 'resize';
        corner: string;
        startX: number;
        startY: number;
        orig: Shape;
        moved: boolean;
      };

  const toolButtons = Array.from(editor.querySelectorAll<HTMLButtonElement>('[data-tool]'));
  const shapeButtons = Array.from(editor.querySelectorAll<HTMLButtonElement>('[data-shape]'));
  const emojiButtons = Array.from(editor.querySelectorAll<HTMLButtonElement>('[data-emoji]'));

  function clamp(value: number, min: number, max: number): number {
    return Math.min(max, Math.max(min, value));
  }

  function toast(message: string): void {
    toastEl.textContent = message;
    toastEl.classList.add('is-visible');
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => {
      toastEl.classList.remove('is-visible');
    }, 4200);
  }

  function setBusy(active: boolean, label?: string, percent = 6): void {
    busy = active;
    busyOverlay.hidden = !active;
    editor.setAttribute('aria-busy', String(active));
    if (label) busyLabel.textContent = label;
    busyProgress.style.width = `${clamp(percent, 4, 100)}%`;
    if (!active) {
      busyProgress.style.width = '4%';
    }
  }

  function editorInView(): boolean {
    const rect = editor.getBoundingClientRect();
    return rect.bottom > 0 && rect.top < window.innerHeight;
  }

  function setMode(next: Mode): void {
    mode = next;
    toolButtons.forEach((button) => {
      button.setAttribute('aria-pressed', String(button.dataset.tool === next));
    });
    emojiPalette.hidden = next !== 'emoji';
  }

  function setShapeKind(next: ShapeKind): void {
    shapeKind = next;
    shapeButtons.forEach((button) => {
      button.setAttribute('aria-pressed', String(button.dataset.shape === next));
    });
  }

  function setCompare(next: boolean): void {
    if (next && shapes.length === 0) return;
    compare = next;
    compareBtn.setAttribute('aria-pressed', String(compare));
    originalBadge.hidden = !compare;
    overlay.style.visibility = compare ? 'hidden' : '';
    render();
  }

  function clearVerifyStatus(): void {
    verifyStatus.hidden = true;
    verifyText.textContent = '';
    verifyStatus.removeAttribute('data-state');
  }

  function setVerifyStatus(state: 'ok' | 'warn', text: string): void {
    verifyStatus.hidden = false;
    verifyStatus.dataset.state = state;
    verifyText.textContent = text;
  }

  function refreshChrome(): void {
    countEl.textContent = String(shapes.length);
    countLabel.textContent = shapes.length === 1 ? 'redaction' : 'redactions';
    downloadBtn.disabled = shapes.length === 0;
    copyBtn.disabled = shapes.length === 0;
    verifyBtn.disabled = shapes.length === 0;
    compareBtn.disabled = shapes.length === 0;
    clearBtn.disabled = shapes.length === 0;
    undoBtn.disabled = historyIndex <= 0;
    redoBtn.disabled = historyIndex >= history.length - 1;
    scanBtn.disabled = !hasImage || busy;
    updateSizeButton();
    if (shapes.length === 0) {
      compare = false;
      compareBtn.setAttribute('aria-pressed', 'false');
      originalBadge.hidden = true;
      overlay.style.visibility = '';
    }
  }

  function cloneShapes(): Shape[] {
    return shapes.map((shape) => ({ ...shape }));
  }

  function commitHistory(): void {
    history = history.slice(0, historyIndex + 1);
    history.push(cloneShapes());
    historyIndex = history.length - 1;
    clearVerifyStatus();
    refreshChrome();
    if (!sizePanel.hidden) scheduleMeasure();
  }

  function scheduleRender(): void {
    if (!hasImage || raf) return;
    raf = requestAnimationFrame(() => {
      raf = 0;
      render();
      updateSelection();
    });
  }

  function render(): void {
    if (!hasImage) return;
    renderScene({
      canvas,
      source: baseCanvas,
      width: baseCanvas.width,
      height: baseCanvas.height,
      shapes: compare ? [] : shapes,
    });
  }

  function percent(value: number, total: number): string {
    return `${(value / total) * 100}%`;
  }

  function placeBox(element: HTMLElement, box: { x: number; y: number; w: number; h: number }): void {
    element.style.left = percent(box.x, baseCanvas.width);
    element.style.top = percent(box.y, baseCanvas.height);
    element.style.width = percent(box.w, baseCanvas.width);
    element.style.height = percent(box.h, baseCanvas.height);
  }

  function selectedShape(): Shape | undefined {
    return shapes.find((shape) => shape.id === selectedId);
  }

  function updateSelection(): void {
    const shape = selectedShape();
    if (!shape || compare) {
      selection.hidden = true;
      return;
    }
    selection.hidden = false;
    placeBox(selection, shape);
  }

  function hitTest(x: number, y: number): Shape | null {
    for (let index = shapes.length - 1; index >= 0; index -= 1) {
      const shape = shapes[index];
      if (shape.kind === 'ellipse') {
        const radiusX = shape.w / 2;
        const radiusY = shape.h / 2;
        const dx = (x - (shape.x + radiusX)) / Math.max(radiusX, 1);
        const dy = (y - (shape.y + radiusY)) / Math.max(radiusY, 1);
        if (dx * dx + dy * dy <= 1) return shape;
      } else if (
        x >= shape.x &&
        x <= shape.x + shape.w &&
        y >= shape.y &&
        y <= shape.y + shape.h
      ) {
        return shape;
      }
    }
    return null;
  }

  function pointFromEvent(event: { clientX: number; clientY: number }): { x: number; y: number } {
    const rect = canvas.getBoundingClientRect();
    if (!rect.width || !rect.height) return { x: 0, y: 0 };
    return {
      x: clamp(((event.clientX - rect.left) / rect.width) * baseCanvas.width, 0, baseCanvas.width),
      y: clamp(((event.clientY - rect.top) / rect.height) * baseCanvas.height, 0, baseCanvas.height),
    };
  }

  function updateGhost(): void {
    if (!draft) {
      ghost.hidden = true;
      return;
    }
    ghost.hidden = false;
    placeBox(ghost, draft);
  }

  function updateDraft(point: { x: number; y: number }): void {
    if (!drag || drag.type !== 'draw') return;
    const x = Math.min(drag.startX, point.x);
    const y = Math.min(drag.startY, point.y);
    const w = Math.abs(point.x - drag.startX);
    const h = Math.abs(point.y - drag.startY);
    draft = { x, y, w, h };
    drag.currentX = point.x;
    drag.currentY = point.y;
    updateGhost();
  }

  function removeFindingUI(): void {
    findings = [];
    findingSelected = [];
    suggestions.replaceChildren();
    banner.hidden = true;
    banner.removeAttribute('data-mode');
  }

  function deleteSelected(): void {
    if (selectedId == null) return;
    const before = shapes.length;
    shapes = shapes.filter((shape) => shape.id !== selectedId);
    if (shapes.length === before) return;
    selectedId = null;
    selection.hidden = true;
    commitHistory();
    setCompare(false);
    scheduleRender();
  }

  function undo(): void {
    if (historyIndex <= 0) return;
    historyIndex -= 1;
    shapes = history[historyIndex].map((shape) => ({ ...shape }));
    selectedId = null;
    clearVerifyStatus();
    setCompare(false);
    refreshChrome();
    scheduleRender();
  }

  function redo(): void {
    if (historyIndex >= history.length - 1) return;
    historyIndex += 1;
    shapes = history[historyIndex].map((shape) => ({ ...shape }));
    selectedId = null;
    clearVerifyStatus();
    setCompare(false);
    refreshChrome();
    scheduleRender();
  }

  function addShapes(newShapes: Shape[]): number {
    if (!newShapes.length) return 0;
    shapes.push(...newShapes);
    selectedId = null;
    selection.hidden = true;
    commitHistory();
    setCompare(false);
    scheduleRender();
    return newShapes.length;
  }

  function clearAll(): void {
    if (!shapes.length) return;
    if (clearBtn.dataset.armed !== 'true') {
      clearBtn.dataset.armed = 'true';
      clearBtn.setAttribute('aria-label', 'Click again to clear all redactions');
      toast(`Click clear again to remove all ${shapes.length} redaction${shapes.length === 1 ? '' : 's'}.`);
      window.clearTimeout(clearTimer);
      clearTimer = window.setTimeout(() => {
        delete clearBtn.dataset.armed;
        clearBtn.setAttribute('aria-label', 'Clear all redactions');
      }, 3500);
      return;
    }
    delete clearBtn.dataset.armed;
    clearBtn.setAttribute('aria-label', 'Clear all redactions');
    shapes = [];
    selectedId = null;
    selection.hidden = true;
    commitHistory();
    setCompare(false);
    scheduleRender();
    toast('All redactions cleared.');
  }

  function statusLabel(count: number): string {
    return `${count} sensitive detail${count === 1 ? '' : 's'} found`;
  }

  function renderSuggestions(): void {
    suggestions.replaceChildren();
    findings.forEach((finding, index) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'suggestion';
      button.style.left = percent(finding.x, baseCanvas.width);
      button.style.top = percent(finding.y, baseCanvas.height);
      button.style.width = percent(finding.w, baseCanvas.width);
      button.style.height = percent(finding.h, baseCanvas.height);
      button.setAttribute('aria-pressed', String(findingSelected[index]));
      button.setAttribute(
        'aria-label',
        `${findingSelected[index] ? 'Exclude' : 'Include'} ${finding.kind}: ${finding.text}`
      );
      button.title = `${finding.kind}: ${finding.text}`;

      const tag = document.createElement('span');
      tag.className = 'suggestion-tag';
      tag.textContent = finding.kind;
      button.appendChild(tag);

      button.addEventListener('click', () => {
        findingSelected[index] = !findingSelected[index];
        button.setAttribute('aria-pressed', String(findingSelected[index]));
        button.setAttribute(
          'aria-label',
          `${findingSelected[index] ? 'Exclude' : 'Include'} ${finding.kind}: ${finding.text}`
        );
        updateBanner();
      });

      suggestions.appendChild(button);
    });
  }

  function updateBanner(): void {
    if (!findings.length) {
      banner.hidden = true;
      return;
    }
    const sensitiveCount = findings.filter((finding) => finding.sensitive).length;
    const selectedCount = findingSelected.filter(Boolean).length;
    const isVerify = banner.dataset.mode === 'verify';

    bannerTitle.textContent = isVerify
      ? 'Some details are still readable'
      : sensitiveCount > 0
        ? statusLabel(sensitiveCount)
        : `${findings.length} text block${findings.length === 1 ? '' : 's'} found`;

    bannerSub.textContent = isVerify
      ? 'The re-scan found text that still matches a sensitive pattern. Add another box, then verify again.'
      : sensitiveCount > 0
        ? 'OCR runs locally. Hover a box to preview the ink, click to include or exclude it, then redact them all.'
        : 'Nothing matched our sensitive patterns. Hover to preview, or use All text to redact every line anyway.';

    detectPrimary.textContent = `Redact ${selectedCount}`;
    detectPrimary.disabled = selectedCount === 0;
    detectAll.hidden = isVerify;
    detectAll.textContent = `All text (${findings.length})`;
    banner.hidden = false;
  }

  function applyFindings(which: 'selected' | 'all'): void {
    const chosen =
      which === 'all'
        ? findings
        : findings.filter((finding, index) => findingSelected[index]);
    if (!chosen.length) return;

    const added = addShapes(
      chosen.map((finding) => ({
        id: nextId++,
        mode: 'ink' as Mode,
        kind: 'rect' as ShapeKind,
        x: Math.max(0, finding.x - 2),
        y: Math.max(0, finding.y - 2),
        w: Math.min(baseCanvas.width - Math.max(0, finding.x - 2), finding.w + 4),
        h: Math.min(baseCanvas.height - Math.max(0, finding.y - 2), finding.h + 4),
      }))
    );

    removeFindingUI();
    toast(
      `${added} redaction${added === 1 ? '' : 's'} added. Review them before you download.`
    );
  }

  function dismissFindings(): void {
    removeFindingUI();
  }

  async function runScan(nextMode: 'scan' | 'verify'): Promise<void> {
    if (!hasImage || busy) return;
    if (nextMode === 'verify' && shapes.length === 0) {
      toast('Add at least one redaction before running a verification scan.');
      return;
    }

    setCompare(false);
    setBusy(
      true,
      nextMode === 'verify' ? 'Re-scanning the flattened result…' : 'Preparing a local scan…',
      6
    );
    scanBtn.disabled = true;

    try {
      const snapshot = document.createElement('canvas');
      renderScene({
        canvas: snapshot,
        source: baseCanvas,
        width: baseCanvas.width,
        height: baseCanvas.height,
        shapes,
        background: '#ffffff',
      });

      const result = await scanCanvas(snapshot, ({ label, percent: progress }) => {
        setBusy(true, label, progress);
      });

      if (nextMode === 'verify') {
        const remaining = result.filter((finding) => finding.sensitive);
        if (remaining.length === 0) {
          setVerifyStatus('ok', 'No readable PII found');
          removeFindingUI();
          toast('Verified. The flattened image has no readable PII. Always give it a final look.');
          return;
        }

        findings = remaining;
        findingSelected = remaining.map(() => true);
        selectedId = null;
        selection.hidden = true;
        banner.dataset.mode = 'verify';
        renderSuggestions();
        updateBanner();
        setVerifyStatus('warn', `${remaining.length} readable detail${remaining.length === 1 ? '' : 's'} remain`);
        toast(
          `${remaining.length} readable detail${remaining.length === 1 ? '' : 's'} still remain. Add another box or redact them below.`
        );
        return;
      }

      if (result.length === 0) {
        removeFindingUI();
        toast('No readable text found. Draw a box over anything the scan missed.');
        return;
      }

      findings = result;
      findingSelected = result.map((finding) => finding.sensitive);
      selectedId = null;
      selection.hidden = true;
      banner.dataset.mode = 'scan';
      renderSuggestions();
      updateBanner();

      const sensitiveCount = result.filter((finding) => finding.sensitive).length;
      toast(
        sensitiveCount > 0
          ? `${sensitiveCount} sensitive detail${sensitiveCount === 1 ? '' : 's'} found. Review the boxes.`
          : `${result.length} text block${result.length === 1 ? '' : 's'} found. Use All text to redact every line.`
      );
    } catch (error) {
      console.error(error);
      toast('Smart detection could not load. Check your connection, or draw boxes manually.');
    } finally {
      setBusy(false);
      scanBtn.disabled = false;
      refreshChrome();
    }
  }

  function renderFullScene(type: string): HTMLCanvasElement {
    const output = document.createElement('canvas');
    renderScene({
      canvas: output,
      source: baseCanvas,
      width: baseCanvas.width,
      height: baseCanvas.height,
      shapes,
      background: type === 'image/jpeg' ? '#ffffff' : undefined,
    });
    return output;
  }

  /**
   * The flattened scene, optionally rescaled so the longest edge fits inside
   * `maxDim`. The scene is rendered at full size first so every redaction stays
   * exactly where the user drew it, then downscaled as a whole.
   */
  function exportCanvas(type: string, maxDim = reduceMax): HTMLCanvasElement {
    const full = renderFullScene(type);
    const longest = Math.max(full.width, full.height);
    if (!maxDim || longest <= maxDim) return full;

    const scale = maxDim / longest;
    const output = document.createElement('canvas');
    output.width = Math.max(1, Math.round(full.width * scale));
    output.height = Math.max(1, Math.round(full.height * scale));
    const context = output.getContext('2d');
    if (!context) return full;
    context.imageSmoothingEnabled = true;
    context.imageSmoothingQuality = 'high';
    context.drawImage(full, 0, 0, output.width, output.height);
    return output;
  }

  function toBlob(
    source: HTMLCanvasElement,
    type: string,
    quality = 0.92
  ): Promise<Blob> {
    return new Promise((resolve, reject) => {
      source.toBlob(
        (blob) => {
          if (blob) resolve(blob);
          else reject(new Error('Could not encode the image'));
        },
        type,
        type === 'image/png' ? undefined : quality
      );
    });
  }

  function formatBytes(bytes: number): string {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }

  function sizeSettingsActive(): boolean {
    return reduceMax > 0 || reduceQuality < 0.92;
  }

  function updateSizeButton(): void {
    const active = sizeSettingsActive();
    sizeBtn.dataset.active = active ? 'true' : 'false';
    sizeBtn.title = active
      ? 'Size reduction is on for this export'
      : 'Reduce the exported file size';
  }

  function updateSizeNote(): void {
    const isPng = formatSelect.value === 'image/png';
    sizeQuality.disabled = isPng;
    sizeQualityValue.textContent = isPng ? 'n/a' : `${Math.round(reduceQuality * 100)}%`;
    sizeNote.textContent = isPng
      ? 'PNG is lossless, so quality does not apply. Use the longest-edge cap to shrink it.'
      : 'Applies to JPG and WebP exports. PNG stays lossless.';
  }

  async function measureExport(): Promise<void> {
    if (!hasImage) return;
    const type = formatSelect.value;
    try {
      const baseline = await toBlob(renderFullScene(type), type, 0.92);
      const reducedCanvas = exportCanvas(type);
      const reduced = await toBlob(reducedCanvas, type, reduceQuality);
      const saved = Math.round((1 - reduced.size / baseline.size) * 100);

      sizeEstimate.textContent = `${formatBytes(reduced.size)} · ${reducedCanvas.width} × ${reducedCanvas.height}`;
      sizeSavings.textContent =
        saved >= 1
          ? `−${saved}% vs ${formatBytes(baseline.size)} at full size`
          : 'Same size as the default export';
    } catch {
      sizeEstimate.textContent = 'Could not measure this export.';
      sizeSavings.textContent = '';
    }
  }

  function scheduleMeasure(): void {
    window.clearTimeout(sizeTimer);
    sizeTimer = window.setTimeout(() => {
      void measureExport();
    }, 220);
  }

  function toggleSizePanel(force?: boolean): void {
    const open = force ?? sizePanel.hidden;
    sizePanel.hidden = !open;
    sizeBtn.setAttribute('aria-expanded', String(open));
    if (open) {
      updateSizeNote();
      void measureExport();
    }
  }

  function baseName(): string {
    const cleaned = imageName
      .replace(/\.[^.]+$/, '')
      .replace(/[^a-z0-9-_]+/gi, '-')
      .replace(/^-+|-+$/g, '')
      .toLowerCase();
    return cleaned || 'image';
  }

  async function download(): Promise<void> {
    if (shapes.length === 0) {
      toast('Add at least one redaction before downloading.');
      return;
    }
    try {
      const type = formatSelect.value;
      const extension = type === 'image/jpeg' ? 'jpg' : type === 'image/webp' ? 'webp' : 'png';
      const output = exportCanvas(type);
      const blob = await toBlob(output, type, reduceQuality);
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${baseName()}-redacted.${extension}`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.setTimeout(() => URL.revokeObjectURL(url), 1200);
      const reduced = sizeSettingsActive() ? ` (${formatBytes(blob.size)}, reduced)` : '';
      toast(`Downloaded${reduced}. EXIF, GPS, and other metadata are stripped.`);
    } catch (error) {
      console.error(error);
      toast('The download could not be created. Try PNG instead.');
    }
  }

  async function copyImage(): Promise<void> {
    if (shapes.length === 0) {
      toast('Add at least one redaction before copying.');
      return;
    }
    try {
      if (!navigator.clipboard || typeof ClipboardItem === 'undefined') {
        throw new Error('Clipboard images are unavailable');
      }
      const output = exportCanvas('image/png');
      const blob = await toBlob(output, 'image/png');
      await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
      toast('Copied to the clipboard. Metadata removed.');
    } catch (error) {
      console.error(error);
      toast('Clipboard access is blocked here. Use Download instead.');
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

    baseCanvas.width = width;
    baseCanvas.height = height;
    const context = baseCanvas.getContext('2d');
    if (!context) {
      toast('Canvas is unavailable in this browser.');
      return;
    }
    context.fillStyle = '#ffffff';
    context.fillRect(0, 0, width, height);
    context.imageSmoothingQuality = 'high';
    context.drawImage(image, 0, 0, width, height);

    canvas.width = width;
    canvas.height = height;

    hasImage = true;
    imageName = name;
    shapes = [];
    selectedId = null;
    nextId = 1;
    history = [[]];
    historyIndex = 0;
    compare = false;
    compareBtn.setAttribute('aria-pressed', 'false');
    originalBadge.hidden = true;
    overlay.style.visibility = '';
    draft = null;
    drag = null;
    ghost.hidden = true;
    selection.hidden = true;
    removeFindingUI();
    clearVerifyStatus();
    setBusy(false);

    filenameEl.textContent = name;
    filenameEl.title = name;
    sizeEl.textContent = `${width} × ${height}`;
    sizeEl.title =
      scale < 1 ? `Original: ${naturalWidth} × ${naturalHeight}. Downscaled for memory.` : '';
    dropzone.hidden = true;
    workspace.hidden = false;

    setMode(mode);
    refreshChrome();
    scheduleRender();
    if (!sizePanel.hidden) scheduleMeasure();
    toast('Image loaded. It never left your device.');
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
      if (hasImage) {
        toast('Replaced the previous image. Redactions were reset.');
      }
      applyImage(image, file.name || 'screenshot.png');
    } catch {
      toast('That file could not be read as an image. Try a PNG or JPG.');
    } finally {
      URL.revokeObjectURL(url);
    }
  }

  async function loadSample(source: string, name: string): Promise<void> {
    try {
      const image = await loadImage(source);
      if (hasImage) {
        toast('Replaced the previous image. Redactions were reset.');
      }
      applyImage(image, name);
    } catch {
      toast('The sample could not load. Try choosing your own image.');
    }
  }

  function findImageFile(items: DataTransferItemList | null): File | null {
    if (!items) return null;
    for (const item of Array.from(items)) {
      if (item.kind === 'file' && item.type.startsWith('image/')) {
        return item.getAsFile();
      }
    }
    return null;
  }

  // --- Event wiring -------------------------------------------------------

  toolButtons.forEach((button) => {
    button.addEventListener('click', () => setMode(button.dataset.tool as Mode));
  });

  shapeButtons.forEach((button) => {
    button.addEventListener('click', () => setShapeKind(button.dataset.shape as ShapeKind));
  });

  emojiButtons.forEach((button) => {
    button.addEventListener('click', () => {
      emoji = button.dataset.emoji ?? '😎';
      setMode('emoji');
      emojiButtons.forEach((item) => {
        item.setAttribute('aria-pressed', String(item.dataset.emoji === emoji));
      });
      const shape = selectedShape();
      if (shape && shape.mode === 'emoji') {
        shape.emoji = emoji;
        commitHistory();
        scheduleRender();
      }
    });
  });

  editor.querySelectorAll<HTMLElement>('[data-open-file]').forEach((button) => {
    button.addEventListener('click', () => fileInput.click());
  });

  fileInput.addEventListener('change', () => {
    const file = fileInput.files?.[0];
    fileInput.value = '';
    if (file) void loadFile(file);
  });

  editor.querySelectorAll<HTMLButtonElement>('[data-sample]').forEach((button) => {
    button.addEventListener('click', async () => {
      const source = button.dataset.sample;
      if (!source) return;
      button.disabled = true;
      button.setAttribute('aria-busy', 'true');
      await loadSample(source, button.dataset.sampleName || 'Sample screenshot');
      button.disabled = false;
      button.removeAttribute('aria-busy');
    });
  });

  undoBtn.addEventListener('click', undo);
  redoBtn.addEventListener('click', redo);
  clearBtn.addEventListener('click', clearAll);
  compareBtn.addEventListener('click', () => setCompare(!compare));
  scanBtn.addEventListener('click', () => void runScan('scan'));
  verifyBtn.addEventListener('click', () => void runScan('verify'));
  downloadBtn.addEventListener('click', () => void download());
  copyBtn.addEventListener('click', () => void copyImage());
  detectPrimary.addEventListener('click', () => applyFindings('selected'));
  detectAll.addEventListener('click', () => applyFindings('all'));
  detectDismiss.addEventListener('click', dismissFindings);
  sizeBtn.addEventListener('click', () => toggleSizePanel());
  sizeQuality.addEventListener('input', () => {
    reduceQuality = Number(sizeQuality.value) / 100;
    updateSizeNote();
    updateSizeButton();
    scheduleMeasure();
  });
  sizeMax.addEventListener('change', () => {
    reduceMax = Number(sizeMax.value);
    updateSizeButton();
    scheduleMeasure();
  });
  formatSelect.addEventListener('change', () => {
    updateSizeNote();
    if (!sizePanel.hidden) scheduleMeasure();
  });
  deleteSelectedBtn.addEventListener('click', (event) => {
    event.stopPropagation();
    deleteSelected();
  });

  canvas.addEventListener('pointerdown', (event) => {
    if (!hasImage || busy) return;
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    event.preventDefault();
    canvas.focus({ preventScroll: true });
    setCompare(false);

    const point = pointFromEvent(event);
    const hit = event.altKey ? null : hitTest(point.x, point.y);

    if (hit) {
      selectedId = hit.id;
      updateSelection();
      drag = {
        type: 'move',
        startX: point.x,
        startY: point.y,
        orig: { ...hit },
        moved: false,
      };
      frame.classList.add('is-moving');
      return;
    }

    selectedId = null;
    selection.hidden = true;
    draft = { x: point.x, y: point.y, w: 0, h: 0 };
    drag = {
      type: 'draw',
      startX: point.x,
      startY: point.y,
      currentX: point.x,
      currentY: point.y,
    };
    updateGhost();
  });

  editor.querySelectorAll<HTMLElement>('[data-handle]').forEach((handle) => {
    handle.addEventListener('pointerdown', (event) => {
      if (busy) return;
      const shape = selectedShape();
      if (!shape) return;
      event.preventDefault();
      event.stopPropagation();
      const point = pointFromEvent(event);
      drag = {
        type: 'resize',
        corner: handle.dataset.handle ?? 'se',
        startX: point.x,
        startY: point.y,
        orig: { ...shape },
        moved: false,
      };
      frame.classList.add('is-resizing');
    });
  });

  window.addEventListener(
    'pointermove',
    (event) => {
      if (!drag) return;
      event.preventDefault();
      const point = pointFromEvent(event);

      if (drag.type === 'draw') {
        updateDraft(point);
        return;
      }

      if (drag.type === 'move') {
        const shape = shapes.find((item) => item.id === drag?.orig.id);
        if (!shape) return;
        drag.moved = true;
        shape.x = clamp(drag.orig.x + (point.x - drag.startX), 0, baseCanvas.width - shape.w);
        shape.y = clamp(drag.orig.y + (point.y - drag.startY), 0, baseCanvas.height - shape.h);
        scheduleRender();
        return;
      }

      const shape = shapes.find((item) => item.id === drag?.orig.id);
      if (!shape) return;
      drag.moved = true;
      let left = drag.orig.x;
      let top = drag.orig.y;
      let right = drag.orig.x + drag.orig.w;
      let bottom = drag.orig.y + drag.orig.h;
      const min = 10;

      if (drag.corner.includes('w')) left = clamp(point.x, 0, right - min);
      if (drag.corner.includes('e')) right = clamp(point.x, left + min, baseCanvas.width);
      if (drag.corner.includes('n')) top = clamp(point.y, 0, bottom - min);
      if (drag.corner.includes('s')) bottom = clamp(point.y, top + min, baseCanvas.height);

      shape.x = left;
      shape.y = top;
      shape.w = right - left;
      shape.h = bottom - top;
      scheduleRender();
    },
    { passive: false }
  );

  function endDrag(): void {
    if (!drag) return;
    const finished = drag;
    drag = null;
    frame.classList.remove('is-moving', 'is-resizing');
    ghost.hidden = true;

    if (finished.type === 'draw') {
      const box = draft;
      draft = null;
      if (box && box.w >= 8 && box.h >= 8) {
        const shape: Shape = {
          id: nextId++,
          mode,
          kind: shapeKind,
          x: box.x,
          y: box.y,
          w: box.w,
          h: box.h,
          emoji: mode === 'emoji' ? emoji : undefined,
        };
        shapes.push(shape);
        selectedId = shape.id;
        commitHistory();
        setCompare(false);
        scheduleRender();
        updateSelection();
      } else {
        updateGhost();
      }
      return;
    }

    if (finished.moved) {
      commitHistory();
      refreshChrome();
    }
  }

  window.addEventListener('pointerup', endDrag);
  window.addEventListener('pointercancel', endDrag);

  document.addEventListener('paste', (event) => {
    if (!editorInView()) return;
    const target = event.target as HTMLElement | null;
    if (target?.matches('input, textarea, select, [contenteditable="true"]')) return;
    const file = findImageFile(event.clipboardData?.items ?? null);
    if (!file) return;
    event.preventDefault();
    if (hasImage) {
      toast('You already have an image open. Use Replace image to swap it.');
      return;
    }
    void loadFile(file);
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
    if (hasImage) {
      toast('You already have an image open. Use Replace image to swap it.');
      return;
    }
    const file = event.dataTransfer?.files?.[0];
    if (file) void loadFile(file);
  });

  window.addEventListener('dragover', (event) => {
    if (!editorInView()) return;
    event.preventDefault();
    if (event.dataTransfer) event.dataTransfer.dropEffect = hasImage ? 'none' : 'copy';
  });

  window.addEventListener('drop', (event) => {
    if (!editorInView()) return;
    event.preventDefault();
    if (hasImage) {
      toast('You already have an image open. Use Replace image to swap it.');
    }
  });

  document.addEventListener('keydown', (event) => {
    if (!hasImage || !editorInView()) return;
    const target = event.target as HTMLElement | null;
    if (target?.matches('input, textarea, select, [contenteditable="true"]')) return;
    const modifier = event.metaKey || event.ctrlKey;

    if (modifier && event.key.toLowerCase() === 'z') {
      event.preventDefault();
      if (event.shiftKey) redo();
      else undo();
      return;
    }
    if (modifier && event.key.toLowerCase() === 'y') {
      event.preventDefault();
      redo();
      return;
    }
    if (event.key === 'Escape') {
      selectedId = null;
      selection.hidden = true;
      draft = null;
      ghost.hidden = true;
      drag = null;
      frame.classList.remove('is-moving', 'is-resizing');
      return;
    }
    if (event.key === 'Delete' || event.key === 'Backspace') {
      if (selectedId != null) {
        event.preventDefault();
        deleteSelected();
      }
      return;
    }
    if (modifier || event.altKey) return;

    switch (event.key.toLowerCase()) {
      case 'b':
        setMode('ink');
        break;
      case 'p':
        setMode('pixelate');
        break;
      case 'l':
        setMode('blur');
        break;
      case 'e':
        setMode('emoji');
        break;
      case 'r':
        setShapeKind('rect');
        break;
      case 'o':
        setShapeKind('ellipse');
        break;
      case 'c':
        setCompare(!compare);
        break;
      default:
        break;
    }
  });

  document.querySelectorAll<HTMLButtonElement>('[data-redactor-sample]').forEach((button) => {
    button.addEventListener('click', async () => {
      const source = button.dataset.redactorSample;
      if (!source) return;
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      editor.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
      button.disabled = true;
      await loadSample(source, button.dataset.redactorSampleName || 'Sample screenshot');
      button.disabled = false;
    });
  });

  setMode('ink');
  setShapeKind('rect');
  refreshChrome();
  setBusy(false);
}
