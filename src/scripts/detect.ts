export interface Finding {
  x: number;
  y: number;
  w: number;
  h: number;
  text: string;
  kind: string;
  sensitive: boolean;
  confidence: number;
}

export interface ScanProgress {
  label: string;
  percent: number;
}

type ProgressHandler = (progress: ScanProgress) => void;

const TESSERACT_SRC = 'https://cdn.jsdelivr.net/npm/tesseract.js@6.0.1/dist/tesseract.min.js';
const MAX_OCR_EDGE = 1800;

let scriptPromise: Promise<void> | null = null;
let workerPromise: Promise<any> | null = null;
let activeProgress: ProgressHandler | null = null;

function loadScript(): Promise<void> {
  if ((window as any).Tesseract) return Promise.resolve();
  if (scriptPromise) return scriptPromise;

  scriptPromise = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = TESSERACT_SRC;
    script.async = true;
    script.crossOrigin = 'anonymous';
    script.onload = () => resolve();
    script.onerror = () => {
      scriptPromise = null;
      reject(new Error('Could not load the OCR engine'));
    };
    document.head.appendChild(script);
  });

  return scriptPromise;
}

function progressLabel(status: string, progress: number): ScanProgress {
  const value = Math.max(0, Math.min(1, progress || 0));
  if (status.includes('loading tesseract core')) {
    return { label: 'Loading the OCR engine…', percent: 8 + value * 8 };
  }
  if (status.includes('loading language')) {
    return { label: 'Loading the English text model (first run only)…', percent: 18 + value * 32 };
  }
  if (status.includes('initializing')) {
    return { label: 'Starting smart detection…', percent: 54 + value * 6 };
  }
  if (status.includes('recognizing')) {
    return { label: 'Reading text on your device…', percent: 62 + value * 34 };
  }
  return { label: 'Preparing smart detection…', percent: 6 };
}

async function getWorker(onProgress: ProgressHandler): Promise<any> {
  activeProgress = onProgress;
  if (workerPromise) return workerPromise;

  await loadScript();
  const Tesseract = (window as any).Tesseract;
  if (!Tesseract) throw new Error('OCR engine unavailable');

  workerPromise = Tesseract.createWorker('eng', 1, {
    logger: (message: { status?: string; progress?: number }) => {
      if (!activeProgress) return;
      activeProgress(progressLabel(message.status ?? '', message.progress ?? 0));
    },
  }).catch((error: unknown) => {
    workerPromise = null;
    throw error;
  });

  return workerPromise;
}

function digitsOnly(value: string): string {
  return value.replace(/\D/g, '');
}

function passesLuhn(value: string): boolean {
  const digits = digitsOnly(value);
  if (digits.length < 13 || digits.length > 19) return false;
  let sum = 0;
  let double = false;
  for (let index = digits.length - 1; index >= 0; index -= 1) {
    let digit = Number(digits[index]);
    if (double) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
    double = !double;
  }
  return sum % 10 === 0;
}

const EMAIL = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i;
const PHONE = /(?:\+?\d{1,3}[\s.\-]?)?(?:\(?\d{2,5}\)?[\s.\-]?){2,5}\d{2,4}/;
const CARD_CANDIDATE = /\b(?:\d[ -]?){13,19}\b/;
const AADHAAR = /\b\d{4}\s?\d{4}\s?\d{4}\b/;
const SSN = /\b\d{3}-\d{2}-\d{4}\b/;
const PAN = /\b[A-Z]{5}\d{4}[A-Z]\b/;
const GSTIN = /\b\d{2}[A-Z]{5}\d{4}[A-Z][A-Z0-9][A-Z]\d\b/;
const IBAN = /\b[A-Z]{2}\d{2}[A-Z0-9]{11,30}\b/;
const IPV4 = /\b(?:\d{1,3}\.){3}\d{1,3}\b/;
const DATE_NUMERIC = /\b\d{1,2}[/.\-]\d{1,2}[/.\-]\d{2,4}\b/;
const DATE_MONTH = /\b\d{1,2}\s+(?:jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*\.?\s+\d{2,4}\b/i;
const DATE_EXPIRY = /\b(?:0[1-9]|1[0-2])\s?[/\-]\s?\d{2,4}\b/;
const NAME_KEYWORD =
  /^(?:full\s+)?name\s*[:\-]|^(?:account\s+holder|customer|cardholder|signed\s+in\s+as|billed\s+to)\b/i;
const ADDRESS_KEYWORD =
  /\b(?:address|street|st\.|road|rd\.|lane|ln\.|avenue|ave\.|boulevard|blvd\.|drive|dr\.|court|ct\.|place|pl\.|square|sq\.|apartment|apt\.?|flat|suite|floor|building|house\s+no|postal|pin|zip|nagar|colony|sector|district)\b/i;
const CARD_KEYWORD = /\b(?:visa|mastercard|amex|american\s+express|card|debit|credit)\b/i;
const CVV_KEYWORD = /\b(?:cvv|cvc|security\s+code)\b/i;
const BANK_KEYWORD = /\b(?:iban|account\s+(?:no|number)|routing|sort\s+code|ifsc|swift|bank\s+account)\b/i;

function classify(raw: string): { kind: string; sensitive: boolean } {
  const text = raw.trim().replace(/\s+/g, ' ');
  if (!text) return { kind: 'Text', sensitive: false };

  if (EMAIL.test(text)) return { kind: 'Email', sensitive: true };

  const cardMatch = text.match(CARD_CANDIDATE);
  if (cardMatch && passesLuhn(cardMatch[0])) {
    return { kind: 'Card number', sensitive: true };
  }

  if (CVV_KEYWORD.test(text)) return { kind: 'Card details', sensitive: true };
  if (CARD_KEYWORD.test(text) && /\d{4}/.test(text)) {
    return { kind: 'Card details', sensitive: true };
  }

  if (SSN.test(text)) return { kind: 'SSN', sensitive: true };
  if (AADHAAR.test(text)) return { kind: 'ID number', sensitive: true };
  if (PAN.test(text)) return { kind: 'PAN', sensitive: true };
  if (GSTIN.test(text)) return { kind: 'Tax ID', sensitive: true };
  if (IBAN.test(text) || BANK_KEYWORD.test(text)) {
    return { kind: 'Bank details', sensitive: true };
  }

  if (IPV4.test(text)) return { kind: 'IP address', sensitive: true };

  const phoneMatch = text.match(PHONE);
  if (phoneMatch) {
    const count = digitsOnly(phoneMatch[0]).length;
    if (count >= 8 && count <= 15) return { kind: 'Phone', sensitive: true };
  }

  if (NAME_KEYWORD.test(text)) return { kind: 'Name', sensitive: true };
  if (ADDRESS_KEYWORD.test(text)) return { kind: 'Address', sensitive: true };
  if (DATE_NUMERIC.test(text) || DATE_MONTH.test(text) || DATE_EXPIRY.test(text)) {
    return { kind: 'Date', sensitive: true };
  }

  // Names are the hardest thing to catch with patterns. A short line made of
  // two to four capitalised words is flagged as a possible name; false
  // positives are cheap here because every suggestion can be deselected.
  // Short all-caps tokens count as initials, which is how chat headers
  // ("AR  Ananya Rao") usually reach the OCR engine.
  const words = text.replace(/[.,;:!?]/g, '').split(/\s+/);
  const nameLike = (word: string): boolean =>
    /^[A-Z][a-z'’-]+$/.test(word) || /^[A-Z]{2,3}$/.test(word);
  if (
    words.length >= 2 &&
    words.length <= 4 &&
    text.length <= 42 &&
    words.every(nameLike)
  ) {
    return { kind: 'Possible name', sensitive: true };
  }

  return { kind: 'Text', sensitive: false };
}

function overlapRatio(a: Finding, b: Finding): number {
  const left = Math.max(a.x, b.x);
  const top = Math.max(a.y, b.y);
  const right = Math.min(a.x + a.w, b.x + b.w);
  const bottom = Math.min(a.y + a.h, b.y + b.h);
  if (right <= left || bottom <= top) return 0;
  const intersection = (right - left) * (bottom - top);
  return intersection / Math.min(a.w * a.h, b.w * b.h);
}

/**
 * Tesseract.js v6 nests recognised lines inside the block tree. Older builds
 * expose them directly on `data.lines`, so both shapes are supported.
 */
function extractLines(data: any): any[] {
  const direct = Array.isArray(data?.lines) ? data.lines : [];
  if (direct.length) return direct;

  const lines: any[] = [];
  for (const block of data?.blocks ?? []) {
    for (const paragraph of block?.paragraphs ?? []) {
      for (const line of paragraph?.lines ?? []) {
        lines.push(line);
      }
    }
  }
  return lines;
}

/**
 * Runs OCR fully in the browser. The image is drawn to a local canvas and
 * passed directly to the worker; no pixels are uploaded anywhere.
 */
export async function scanCanvas(
  source: HTMLCanvasElement,
  onProgress: ProgressHandler
): Promise<Finding[]> {
  const scale = Math.min(1, MAX_OCR_EDGE / Math.max(source.width, source.height));
  const width = Math.max(1, Math.round(source.width * scale));
  const height = Math.max(1, Math.round(source.height * scale));

  const ocrCanvas = document.createElement('canvas');
  ocrCanvas.width = width;
  ocrCanvas.height = height;
  const context = ocrCanvas.getContext('2d');
  if (!context) throw new Error('Canvas is unavailable');

  context.fillStyle = '#ffffff';
  context.fillRect(0, 0, width, height);
  context.imageSmoothingQuality = 'high';
  context.drawImage(source, 0, 0, width, height);

  activeProgress = onProgress;
  onProgress({ label: 'Loading smart detection…', percent: 4 });

  const worker = await getWorker(onProgress);
  activeProgress = onProgress;
  onProgress({ label: 'Reading text on your device…', percent: 62 });

  const result = await worker.recognize(ocrCanvas, {}, { text: true, blocks: true });
  const lines = extractLines(result?.data);
  const inverse = 1 / scale;
  const findings: Finding[] = [];

  for (const line of lines) {
    const text = String(line.text ?? '').trim();
    if (text.length < 2) continue;
    const confidence = Number(line.confidence ?? 0);
    if (confidence > 0 && confidence < 25) continue;

    const bbox = line.bbox;
    if (!bbox) continue;
    const x = Math.max(0, Number(bbox.x0) * inverse - 3);
    const y = Math.max(0, Number(bbox.y0) * inverse - 3);
    const right = Math.min(source.width, Number(bbox.x1) * inverse + 3);
    const bottom = Math.min(source.height, Number(bbox.y1) * inverse + 3);
    const w = right - x;
    const h = bottom - y;
    if (w < 8 || h < 6) continue;

    const classification = classify(text);
    const finding: Finding = {
      x,
      y,
      w,
      h,
      text,
      kind: classification.kind,
      sensitive: classification.sensitive,
      confidence,
    };

    const duplicate = findings.some(
      (existing) =>
        overlapRatio(existing, finding) > 0.82 && existing.text === finding.text
    );
    if (!duplicate) findings.push(finding);
  }

  // Prefer line-level boxes but drop tiny fragments that sit entirely inside
  // a larger sensitive box (common with punctuation and diacritics).
  return findings.filter((finding, index) => {
    if (finding.sensitive) return true;
    return !findings.some(
      (other, otherIndex) =>
        otherIndex !== index &&
        other.sensitive &&
        other.x <= finding.x &&
        other.y <= finding.y &&
        other.x + other.w >= finding.x + finding.w &&
        other.y + other.h >= finding.y + finding.h
    );
  });
}

export function disposeOcr(): void {
  if (workerPromise) {
    workerPromise.then((worker) => worker?.terminate?.()).catch(() => {});
    workerPromise = null;
  }
}

if (typeof window !== 'undefined') {
  window.addEventListener('pagehide', disposeOcr, { once: true });
}
