import { renderScene, type Mode, type Shape, type ShapeKind } from './render';
import { scanCanvas, type Finding } from './detect';
import {
  PDF_EDIT_MAX_EDGE,
  PDF_EXPORT_MAX_EDGE,
  PDF_EXPORT_SCALE,
  buildPdf,
  canvasToJpeg,
  openPdf,
  pageScale,
  renderPdfPage,
  type OpenedPdf,
  type PdfImagePage,
} from './pdf';
import type { PDFDocumentProxy } from 'pdfjs-dist';

const MAX_IMAGE_BYTES = 25 * 1024 * 1024;
const MAX_PDF_BYTES = 50 * 1024 * 1024;
const MAX_PDF_PAGES = 100;

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
  const pageNav = query<HTMLElement>('[data-pdf-nav]');
  const pageIndicator = query<HTMLElement>('[data-page-indicator]');
  const pdfScroll = query<HTMLElement>('[data-pdf-scroll]');
  const pdfStack = query<HTMLElement>('[data-pdf-stack]');
  const pageStatus = query<HTMLElement>('[data-page-status]');
  const pdfNotice = query<HTMLElement>('[data-pdf-notice]');
  const pdfFormat = query<HTMLElement>('[data-pdf-format]');
  const downloadLabel = query<HTMLElement>('[data-download-label]');
  const exportNote = query<HTMLElement>('[data-export-note]');
  const exportNoteText = query<HTMLElement>('[data-export-note-text]');
  const busyNote = query<HTMLElement>('[data-busy-note]');
  const imageOnly = Array.from(editor.querySelectorAll<HTMLElement>('[data-image-only]'));

  const imageCanvas = document.createElement('canvas');
  imageCanvas.width = 1;
  imageCanvas.height = 1;
  /** The source pixels for the active document. For PDFs this points at the
   *  active page's offscreen render, so all shape math stays in one space. */
  let baseCanvas = imageCanvas;

  interface PageState {
    shapes: Shape[];
    history: Shape[][];
    historyIndex: number;
    viewScale: number;
    /** Page size in PDF points, used for the empty placeholder ratio. */
    pageWidth: number;
    pageHeight: number;
    /** Offscreen page render at edit resolution. */
    source: HTMLCanvasElement | null;
    /** Visible canvas inside the scrolling page stack. */
    display: HTMLCanvasElement | null;
    /** Wrapper that owns the page aspect ratio and holds the overlay. */
    sheet: HTMLElement | null;
    rendered: boolean;
    renderPromise: Promise<void> | null;
  }

  function createPageState(): PageState {
    return {
      shapes: [],
      history: [[]],
      historyIndex: 0,
      viewScale: 0,
      pageWidth: 0,
      pageHeight: 0,
      source: null,
      display: null,
      sheet: null,
      rendered: false,
      renderPromise: null,
    };
  }

  let hasDoc = false;
  let docKind: 'image' | 'pdf' = 'image';
  let pdfDoc: PDFDocumentProxy | null = null;
  let pdfDestroy: (() => Promise<void>) | null = null;
  let pdfGeneration = 0;
  let pdfObserver: IntersectionObserver | null = null;
  let pageIndex = 0;
  let pages: PageState[] = [createPageState()];
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
  let scrollRaf = 0;
  let releaseTimer = 0;
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

  function setBusy(active: boolean, label?: string, percent = 6, note?: string): void {
    busy = active;
    busyOverlay.hidden = !active;
    editor.setAttribute('aria-busy', String(active));
    if (label) busyLabel.textContent = label;
    if (note) busyNote.textContent = note;
    busyProgress.style.width = `${clamp(percent, 4, 100)}%`;
    if (!active) {
      busyProgress.style.width = '4%';
      busyNote.textContent =
        'OCR runs in your browser. The English model downloads once — your file is never sent.';
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

  function totalRedactions(): number {
    return pages.reduce(
      (total, page, index) => total + (index === pageIndex ? shapes.length : page.shapes.length),
      0
    );
  }

  function syncPageState(): void {
    const page = pages[pageIndex];
    if (!page) return;
    page.shapes = shapes;
    page.history = history;
    page.historyIndex = historyIndex;
  }

  function clearLabel(): string {
    return docKind === 'pdf' ? 'Clear page redactions' : 'Clear all redactions';
  }

  function updatePageChrome(): void {
    const isPdf = docKind === 'pdf';
    pageNav.hidden = !isPdf;
    pdfNotice.hidden = !isPdf;
    pdfFormat.hidden = !isPdf;
    imageOnly.forEach((element) => {
      element.hidden = isPdf;
    });

    downloadLabel.textContent = isPdf ? 'Download PDF' : 'Download';
    verifyBtn.title = isPdf
      ? 'Re-scan this flattened page for readable PII'
      : 'Re-scan the flattened image for readable PII';
    clearBtn.title = clearLabel();
    if (clearBtn.dataset.armed !== 'true') {
      clearBtn.setAttribute('aria-label', clearLabel());
    }
    exportNoteText.textContent = isPdf ? 'Text layer flattened on export' : 'EXIF stripped on export';
    exportNote.title = isPdf
      ? 'Every page is rasterized. The original text layer, links, form fields, and metadata do not travel with the export.'
      : 'Canvas exports do not carry EXIF, GPS, or camera metadata.';

    if (isPdf) {
      pageIndicator.textContent = `Page ${pageIndex + 1} / ${pages.length}`;
    }
  }

  function refreshChrome(): void {
    const total = totalRedactions();
    countEl.textContent = String(total);
    countLabel.textContent = total === 1 ? 'redaction' : 'redactions';
    downloadBtn.disabled = total === 0;
    copyBtn.disabled = total === 0;
    verifyBtn.disabled = shapes.length === 0;
    compareBtn.disabled = shapes.length === 0;
    clearBtn.disabled = shapes.length === 0;
    undoBtn.disabled = historyIndex <= 0;
    redoBtn.disabled = historyIndex >= history.length - 1;
    scanBtn.disabled = !hasDoc || busy;
    updateSizeButton();
    updatePageChrome();
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
    syncPageState();
    clearVerifyStatus();
    refreshChrome();
    if (!sizePanel.hidden) scheduleMeasure();
  }

  function scheduleRender(): void {
    if (!hasDoc || raf) return;
    raf = requestAnimationFrame(() => {
      raf = 0;
      render();
      updateSelection();
    });
  }

  function render(): void {
    if (!hasDoc) return;
    if (docKind === 'pdf') {
      void renderPageView(pageIndex);
      return;
    }
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

  function activeDisplay(): HTMLCanvasElement {
    if (docKind === 'pdf') {
      return pages[pageIndex]?.display ?? canvas;
    }
    return canvas;
  }

  function interactionSurface(): HTMLElement {
    if (docKind === 'pdf') return pages[pageIndex]?.sheet ?? frame;
    return frame;
  }

  function pointFromEvent(
    event: { clientX: number; clientY: number },
    target: HTMLCanvasElement = activeDisplay()
  ): { x: number; y: number } {
    const rect = target.getBoundingClientRect();
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
    syncPageState();
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
    syncPageState();
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
      clearBtn.setAttribute(
        'aria-label',
        docKind === 'pdf' ? 'Click again to clear this page' : 'Click again to clear all redactions'
      );
      toast(
        `Click clear again to remove all ${shapes.length} redaction${shapes.length === 1 ? '' : 's'}${
          docKind === 'pdf' ? ' on this page' : ''
        }.`
      );
      window.clearTimeout(clearTimer);
      clearTimer = window.setTimeout(() => {
        delete clearBtn.dataset.armed;
        clearBtn.setAttribute('aria-label', clearLabel());
      }, 3500);
      return;
    }
    delete clearBtn.dataset.armed;
    clearBtn.setAttribute('aria-label', clearLabel());
    shapes = [];
    selectedId = null;
    selection.hidden = true;
    commitHistory();
    setCompare(false);
    scheduleRender();
    toast(docKind === 'pdf' ? 'All redactions on this page cleared.' : 'All redactions cleared.');
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
    if (!hasDoc || busy) return;
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
        const scope = docKind === 'pdf' ? ` on page ${pageIndex + 1}` : '';
        if (remaining.length === 0) {
          setVerifyStatus('ok', 'No readable PII found');
          removeFindingUI();
          toast(`Verified${scope}. No readable PII found. Always give it a final look.`);
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
          `${remaining.length} readable detail${remaining.length === 1 ? '' : 's'} still remain${scope}. Add another box or redact them below.`
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
    if (!hasDoc || docKind !== 'image') return;
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
    if (docKind === 'pdf') return;
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

  function saveBlob(blob: Blob, filename: string): void {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1200);
  }

  /**
   * Flattens every PDF page into an image and assembles a fresh document.
   * Pages that were never opened are still rasterized, so no page keeps an
   * original text layer or hidden object.
   */
  async function downloadPdf(): Promise<void> {
    if (!pdfDoc) return;
    syncPageState();
    const total = totalRedactions();
    if (total === 0) {
      toast('Add at least one redaction before downloading.');
      return;
    }

    setBusy(
      true,
      'Flattening every page on your device…',
      4,
      'PDF pages are rendered locally. The original file is never uploaded.'
    );
    downloadBtn.disabled = true;
    updatePageChrome();

    try {
      const rendered: PdfImagePage[] = [];
      for (let index = 0; index < pages.length; index += 1) {
        const progress = 4 + (index / pages.length) * 88;
        setBusy(
          true,
          `Flattening page ${index + 1} of ${pages.length}…`,
          progress,
          'PDF pages are rendered locally. The original file is never uploaded.'
        );

        const page = await pdfDoc.getPage(index + 1);
        const base = page.getViewport({ scale: 1 });
        const exportScale = pageScale(
          { width: base.width, height: base.height },
          PDF_EXPORT_MAX_EDGE,
          PDF_EXPORT_SCALE
        );

        const source = document.createElement('canvas');
        await renderPdfPage(page, source, exportScale);

        const state = pages[index];
        const factor = state.viewScale > 0 ? exportScale / state.viewScale : 1;
        const scaledShapes = state.shapes.map((shape) => ({
          ...shape,
          x: shape.x * factor,
          y: shape.y * factor,
          w: shape.w * factor,
          h: shape.h * factor,
        }));

        const output = document.createElement('canvas');
        renderScene({
          canvas: output,
          source,
          width: source.width,
          height: source.height,
          shapes: scaledShapes,
          background: '#ffffff',
        });

        rendered.push({
          data: await canvasToJpeg(output, 0.92),
          width: base.width,
          height: base.height,
        });
      }

      setBusy(
        true,
        'Assembling the redacted PDF…',
        94,
        'PDF pages are rendered locally. The original file is never uploaded.'
      );
      const blob = await buildPdf(rendered);
      saveBlob(blob, `${baseName()}-redacted.pdf`);
      toast(
        `Downloaded a flattened PDF (${formatBytes(blob.size)}). The original text layer, links, and metadata are gone.`
      );
    } catch (error) {
      console.error(error);
      toast('The PDF could not be exported. Try reopening the file, or use a smaller PDF.');
    } finally {
      setBusy(false);
      refreshChrome();
    }
  }

  async function download(): Promise<void> {
    if (docKind === 'pdf') {
      await downloadPdf();
      return;
    }
    if (shapes.length === 0) {
      toast('Add at least one redaction before downloading.');
      return;
    }
    try {
      const type = formatSelect.value;
      const extension = type === 'image/jpeg' ? 'jpg' : type === 'image/webp' ? 'webp' : 'png';
      const output = exportCanvas(type);
      const blob = await toBlob(output, type, reduceQuality);
      saveBlob(blob, `${baseName()}-redacted.${extension}`);
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

  function teardownPdfView(): void {
    pdfGeneration += 1;
    pdfObserver?.disconnect();
    pdfObserver = null;
    window.clearTimeout(releaseTimer);
    releaseTimer = 0;
    if (scrollRaf) {
      cancelAnimationFrame(scrollRaf);
      scrollRaf = 0;
    }
    pdfStack.replaceChildren();
    pdfScroll.hidden = true;
    pdfScroll.scrollTop = 0;
    pages.forEach((page) => {
      page.source = null;
      page.display = null;
      page.sheet = null;
      page.rendered = false;
      page.renderPromise = null;
    });
  }

  function mountOverlay(sheet: HTMLElement | null): void {
    const parent = sheet ?? frame;
    if (overlay.parentElement !== parent) parent.appendChild(overlay);
  }

  function resetDocumentState(pageCount: number, kind: 'image' | 'pdf'): void {
    if (kind === 'image' && pdfDoc) {
      void pdfDestroy?.().catch((error) => console.error(error));
      pdfDoc = null;
      pdfDestroy = null;
    }

    // Release the old stack before replacing the page state it points at.
    teardownPdfView();
    docKind = kind;
    pageIndex = 0;
    pages = Array.from({ length: Math.max(1, pageCount) }, () => createPageState());
    baseCanvas = imageCanvas;
    shapes = pages[0].shapes;
    history = pages[0].history;
    historyIndex = 0;
    selectedId = null;
    nextId = 1;
    compare = false;
    compareBtn.setAttribute('aria-pressed', 'false');
    originalBadge.hidden = true;
    overlay.style.visibility = '';
    draft = null;
    drag = null;
    ghost.hidden = true;
    selection.hidden = true;
    frame.hidden = kind === 'pdf';
    pdfScroll.hidden = kind !== 'pdf';
    if (kind === 'image') mountOverlay(null);
    window.clearTimeout(clearTimer);
    delete clearBtn.dataset.armed;
    clearBtn.setAttribute('aria-label', clearLabel());
    hasDoc = true;
    removeFindingUI();
    clearVerifyStatus();
    if (!sizePanel.hidden) {
      sizePanel.hidden = true;
      sizeBtn.setAttribute('aria-expanded', 'false');
    }
    setBusy(false);

    if (kind === 'pdf') {
      pageStatus.textContent = `Page 1 of ${pages.length}`;
    }
  }

  async function setupPdfView(doc: PDFDocumentProxy): Promise<void> {
    const generation = pdfGeneration;
    pdfStack.replaceChildren();

    for (let index = 0; index < pages.length; index += 1) {
      const page = await doc.getPage(index + 1);
      if (generation !== pdfGeneration) return;
      if (busy) {
        setBusy(
          true,
          `Preparing page ${index + 1} of ${pages.length}…`,
          8 + (index / pages.length) * 10,
          'PDF pages are rendered locally. The file is never uploaded.'
        );
      }
      const base = page.getViewport({ scale: 1 });
      const state = pages[index];
      state.pageWidth = base.width;
      state.pageHeight = base.height;

      const sheet = document.createElement('div');
      sheet.className = 'pdf-page';
      sheet.dataset.page = String(index);
      sheet.dataset.loading = 'true';
      sheet.style.aspectRatio = `${base.width} / ${base.height}`;
      sheet.setAttribute('role', 'group');
      sheet.setAttribute('aria-label', `PDF page ${index + 1} of ${pages.length}`);

      const display = document.createElement('canvas');
      display.width = 1;
      display.height = 1;
      display.tabIndex = -1;
      display.setAttribute(
        'aria-label',
        `Redaction canvas for PDF page ${index + 1} of ${pages.length}. Draw a box to hide something.`
      );
      display.setAttribute('aria-describedby', 'canvas-help');
      display.addEventListener('pointerdown', (event) => beginPointer(event, display, index));

      const label = document.createElement('span');
      label.className = 'pdf-page-number';
      label.textContent = `${index + 1} / ${pages.length}`;
      label.setAttribute('aria-hidden', 'true');

      sheet.append(display, label);
      state.sheet = sheet;
      state.display = display;
      pdfStack.appendChild(sheet);
    }

    if (generation !== pdfGeneration) return;

    pdfObserver = new IntersectionObserver(
      (entries) => {
        if (generation !== pdfGeneration) return;
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const index = Number((entry.target as HTMLElement).dataset.page);
          if (Number.isInteger(index)) void renderPageView(index);
        }
      },
      { root: pdfScroll, rootMargin: '900px 0px' }
    );
    pages.forEach((state) => {
      if (state.sheet) pdfObserver?.observe(state.sheet);
    });
  }

  async function ensurePageSource(index: number): Promise<boolean> {
    const state = pages[index];
    if (!state || !pdfDoc) return false;
    if (state.source) return true;
    if (state.renderPromise) {
      await state.renderPromise;
      return Boolean(state.source);
    }

    const generation = pdfGeneration;
    const doc = pdfDoc;
    state.renderPromise = (async () => {
      const page = await doc.getPage(index + 1);
      if (generation !== pdfGeneration) return;
      const base = page.getViewport({ scale: 1 });
      const scale = pageScale({ width: base.width, height: base.height }, PDF_EDIT_MAX_EDGE);
      const source = document.createElement('canvas');
      await renderPdfPage(page, source, scale);
      if (generation !== pdfGeneration) return;
      state.source = source;
      state.viewScale = scale;
      state.pageWidth = base.width;
      state.pageHeight = base.height;
    })();

    try {
      await state.renderPromise;
    } finally {
      state.renderPromise = null;
    }
    return Boolean(state.source);
  }

  function paintPage(index: number): boolean {
    const state = pages[index];
    if (!state?.source || !state.display) return false;
    renderScene({
      canvas: state.display,
      source: state.source,
      width: state.source.width,
      height: state.source.height,
      shapes: compare && index === pageIndex ? [] : state.shapes,
    });
    state.rendered = true;
    state.sheet?.removeAttribute('data-loading');
    return true;
  }

  async function renderPageView(index: number): Promise<void> {
    const state = pages[index];
    if (!state || docKind !== 'pdf' || !pdfDoc) return;
    const generation = pdfGeneration;

    try {
      if (!(await ensurePageSource(index))) return;
      if (generation !== pdfGeneration) return;
      if (!paintPage(index)) return;

      if (index === pageIndex) {
        baseCanvas = state.source ?? baseCanvas;
        updateSelection();
      } else if (!busy && nearestPageIndex() === index) {
        // Scrolling can outrun the lazy render. Activate the page as soon as its
        // pixels are ready so drawing always targets what is in view.
        activatePage(index);
      }
    } catch (error) {
      console.error(error);
      state.sheet?.removeAttribute('data-loading');
    }
  }

  function nearestPageIndex(): number {
    const viewport = pdfScroll.getBoundingClientRect();
    if (!viewport.height) return pageIndex;
    const anchor = viewport.top + viewport.height * 0.4;
    let nearest = pageIndex;
    let nearestDistance = Number.POSITIVE_INFINITY;

    for (let index = 0; index < pages.length; index += 1) {
      const sheet = pages[index].sheet;
      if (!sheet) continue;
      const rect = sheet.getBoundingClientRect();
      if (rect.top <= anchor && rect.bottom >= anchor) return index;
      const distance = Math.min(Math.abs(rect.top - anchor), Math.abs(rect.bottom - anchor));
      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearest = index;
      }
    }
    return nearest;
  }

  function activatePage(next: number, force = false): boolean {
    if (!hasDoc || docKind !== 'pdf' || !pages[next]) return false;
    if (!force && next === pageIndex) return true;

    const state = pages[next];
    if (!state.source) {
      void renderPageView(next);
      return false;
    }

    if (next !== pageIndex) {
      syncPageState();
      draft = null;
      drag = null;
      ghost.hidden = true;
      selection.hidden = true;
      frame.classList.remove('is-moving', 'is-resizing');
      pages[pageIndex]?.sheet?.classList.remove('is-moving', 'is-resizing');
      window.clearTimeout(clearTimer);
      delete clearBtn.dataset.armed;
      clearBtn.setAttribute('aria-label', clearLabel());
      removeFindingUI();
      clearVerifyStatus();
      compare = false;
      compareBtn.setAttribute('aria-pressed', 'false');
      originalBadge.hidden = true;
      overlay.style.visibility = '';
      // Make sure the page we are leaving keeps its final pixels even if a
      // scheduled frame had not painted the last committed change yet.
      paintPage(pageIndex);
    }

    pageIndex = next;
    baseCanvas = state.source;
    shapes = state.shapes;
    history = state.history;
    historyIndex = state.historyIndex;
    selectedId = null;
    selection.hidden = true;
    mountOverlay(state.sheet);
    updateSelection();
    pageStatus.textContent = `Page ${next + 1} of ${pages.length}`;
    refreshChrome();
    if (!state.rendered) void renderPageView(next);
    return true;
  }

  function handlePdfScroll(): void {
    if (docKind !== 'pdf' || busy || scrollRaf) return;
    scrollRaf = requestAnimationFrame(() => {
      scrollRaf = 0;
      if (docKind !== 'pdf' || busy) return;

      const next = nearestPageIndex();
      if (next !== pageIndex) {
        if (!activatePage(next)) void renderPageView(next);
      }

      window.clearTimeout(releaseTimer);
      releaseTimer = window.setTimeout(releaseFarPages, 420);
    });
  }

  function releaseFarPages(): void {
    if (docKind !== 'pdf' || busy) return;
    const viewport = pdfScroll.getBoundingClientRect();
    const margin = Math.max(1200, viewport.height * 2.5);

    pages.forEach((state, index) => {
      if (index === pageIndex || !state.rendered || !state.sheet) return;
      const rect = state.sheet.getBoundingClientRect();
      if (rect.bottom > viewport.top - margin && rect.top < viewport.bottom + margin) return;

      state.source = null;
      state.rendered = false;
      if (state.display) {
        state.display.width = 1;
        state.display.height = 1;
      }
      state.sheet.dataset.loading = 'true';
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

    imageCanvas.width = width;
    imageCanvas.height = height;
    baseCanvas = imageCanvas;
    const context = imageCanvas.getContext('2d');
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

    imageName = name;
    resetDocumentState(1, 'image');

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

  async function loadPdfBlob(blob: Blob, name: string): Promise<void> {
    if (blob.size > MAX_PDF_BYTES) {
      toast('That PDF is larger than 50 MB. Try a smaller file or split it first.');
      return;
    }

    setBusy(
      true,
      'Opening the PDF on your device…',
      6,
      'The PDF is parsed locally. Nothing is uploaded.'
    );

    let opened: OpenedPdf | null = null;
    try {
      opened = await openPdf(new Uint8Array(await blob.arrayBuffer()));
      const doc = opened.document;
      if (doc.numPages > MAX_PDF_PAGES) {
        toast(
          `That PDF has ${doc.numPages} pages. The editor handles up to ${MAX_PDF_PAGES} at a time.`
        );
        await opened.destroy();
        opened = null;
        return;
      }

      const previousDestroy = pdfDestroy;
      pdfDoc = doc;
      pdfDestroy = opened.destroy;
      opened = null;
      if (previousDestroy) {
        void previousDestroy().catch((error) => console.error(error));
      }

      resetDocumentState(doc.numPages, 'pdf');
      imageName = name || 'document.pdf';
      filenameEl.textContent = imageName;
      filenameEl.title = imageName;
      sizeEl.textContent = `${doc.numPages} page${doc.numPages === 1 ? '' : 's'}`;
      sizeEl.title = 'Every page is flattened on export.';
      dropzone.hidden = true;
      workspace.hidden = false;

      await setupPdfView(doc);
      setBusy(
        true,
        `Rendering page 1 of ${doc.numPages}…`,
        20,
        'PDF pages are rendered locally. The file is never uploaded.'
      );
      await renderPageView(0);
      activatePage(0, true);
      pdfScroll.scrollTop = 0;
      refreshChrome();
      toast(
        `PDF loaded: ${doc.numPages} page${doc.numPages === 1 ? '' : 's'}. It never left your device.`
      );
    } catch (error) {
      console.error(error);
      if (opened) {
        await opened.destroy();
        opened = null;
      }
      const reason =
        error instanceof Error && /password/i.test(error.message)
          ? 'That PDF is password-protected. Remove the password, then try again.'
          : 'That PDF could not be opened. Check that it is a valid, unencrypted PDF.';
      toast(reason);
    } finally {
      setBusy(false);
    }
  }

  async function loadPdfFile(file: File): Promise<void> {
    await loadPdfBlob(file, file.name || 'document.pdf');
  }

  async function loadFile(file: File): Promise<void> {
    const isPdf = file.type === 'application/pdf' || /\.pdf$/i.test(file.name);
    if (isPdf) {
      await loadPdfFile(file);
      return;
    }

    if (!/^image\/(png|jpeg|webp|gif|bmp|avif)$/i.test(file.type)) {
      toast('Use an image (PNG, JPG, WebP, GIF, BMP, AVIF) or a PDF.');
      return;
    }
    if (file.size > MAX_IMAGE_BYTES) {
      toast('That image is larger than 25 MB. Try a smaller file.');
      return;
    }

    const url = URL.createObjectURL(file);
    try {
      const image = await loadImage(url);
      if (hasDoc) {
        toast('Replaced the previous document. Redactions were reset.');
      }
      applyImage(image, file.name || 'screenshot.png');
    } catch (error) {
      console.error(error);
      toast('That file could not be read as an image. Try a PNG or JPG.');
    } finally {
      URL.revokeObjectURL(url);
    }
  }

  async function loadSample(source: string, name: string): Promise<void> {
    try {
      if (/\.pdf($|\?)/i.test(source)) {
        const response = await fetch(source);
        if (!response.ok) throw new Error('Sample PDF could not be fetched');
        if (hasDoc) {
          toast('Replaced the previous document. Redactions were reset.');
        }
        await loadPdfBlob(await response.blob(), name);
        return;
      }

      const image = await loadImage(source);
      if (hasDoc) {
        toast('Replaced the previous document. Redactions were reset.');
      }
      applyImage(image, name);
    } catch {
      toast('The sample could not load. Try choosing your own file.');
    }
  }

  function findFile(items: DataTransferItemList | null): File | null {
    if (!items) return null;
    for (const item of Array.from(items)) {
      if (
        item.kind === 'file' &&
        (item.type.startsWith('image/') || item.type === 'application/pdf')
      ) {
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

  pdfScroll.addEventListener('scroll', handlePdfScroll, { passive: true });

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

  function beginPointer(
    event: PointerEvent,
    target: HTMLCanvasElement,
    pageHint?: number
  ): void {
    if (!hasDoc || busy) return;
    if (event.pointerType === 'mouse' && event.button !== 0) return;

    if (pageHint !== undefined && pageHint !== pageIndex) {
      // A click on a page activates it first, so undo, clear, and verify always
      // act on the page the person is looking at.
      if (!pages[pageHint]?.source) {
        void renderPageView(pageHint);
        return;
      }
      if (!activatePage(pageHint)) return;
    }

    event.preventDefault();
    target.focus({ preventScroll: true });
    setCompare(false);

    const point = pointFromEvent(event, target);
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
      interactionSurface().classList.add('is-moving');
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
  }

  canvas.addEventListener('pointerdown', (event) => beginPointer(event, canvas));

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
      interactionSurface().classList.add('is-resizing');
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
    interactionSurface().classList.remove('is-moving', 'is-resizing');
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
    const file = findFile(event.clipboardData?.items ?? null);
    if (!file) return;
    event.preventDefault();
    if (hasDoc) {
      toast('You already have a file open. Use Replace file to swap it.');
      return;
    }
    void loadFile(file);
  });

  ['dragenter', 'dragover'].forEach((type) => {
    dropzone.addEventListener(type, (event) => {
      if (hasDoc) return;
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
    if (hasDoc) {
      toast('You already have a file open. Use Replace file to swap it.');
      return;
    }
    const file = event.dataTransfer?.files?.[0];
    if (file) void loadFile(file);
  });

  window.addEventListener('dragover', (event) => {
    if (!editorInView()) return;
    event.preventDefault();
    if (event.dataTransfer) event.dataTransfer.dropEffect = hasDoc ? 'none' : 'copy';
  });

  window.addEventListener('drop', (event) => {
    if (!editorInView()) return;
    event.preventDefault();
    if (hasDoc) {
      toast('You already have a file open. Use Replace file to swap it.');
    }
  });

  document.addEventListener('keydown', (event) => {
    if (!hasDoc || !editorInView()) return;
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
      interactionSurface().classList.remove('is-moving', 'is-resizing');
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
