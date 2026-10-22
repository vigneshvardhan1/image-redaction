/**
 * Finds human faces in a raster image with MediaPipe's BlazeFace model.
 *
 * The model, the WebAssembly runtime, and inference all run in the browser.
 * The image is handed to the detector as a local canvas and never uploaded.
 * MediaPipe is fetched on first use so the editor itself stays light.
 */
import type { Finding } from './detect';

const TASKS_SRC = 'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@1.1.1';
const WASM_SRC = `${TASKS_SRC}/wasm`;
const MODEL_SRC =
  'https://storage.googleapis.com/mediapipe-models/face_detector/blaze_face_full_range/float16/1/blaze_face_full_range.tflite';

const MAX_DETECT_EDGE = 2400;
const MIN_CONFIDENCE = 0.4;
/** Grow every box slightly so hair, ears, and chins are not left readable. */
const BOX_PADDING = 0.14;

interface MediaPipeBox {
  originX: number;
  originY: number;
  width: number;
  height: number;
}

interface MediaPipeDetection {
  boundingBox?: MediaPipeBox;
  categories?: Array<{ score?: number }>;
}

interface FaceDetector {
  detect: (source: HTMLCanvasElement) => { detections?: MediaPipeDetection[] };
  close: () => void;
}

let detectorPromise: Promise<FaceDetector> | null = null;

async function createDetector(): Promise<FaceDetector> {
  // The URL stays in a variable so Vite leaves the dynamic import untouched.
  const moduleUrl = TASKS_SRC;
  const mediapipe = (await import(/* @vite-ignore */ moduleUrl)) as any;
  const fileset = await mediapipe.FilesetResolver.forVisionTasks(WASM_SRC);
  const options = {
    baseOptions: { modelAssetPath: MODEL_SRC, delegate: 'GPU' },
    runningMode: 'IMAGE',
    minDetectionConfidence: MIN_CONFIDENCE,
    minSuppressionThreshold: 0.3,
  };

  try {
    return await mediapipe.FaceDetector.createFromOptions(fileset, options);
  } catch {
    // Some browsers block the GPU delegate. CPU is slower but dependable.
    return mediapipe.FaceDetector.createFromOptions(fileset, {
      ...options,
      baseOptions: { ...options.baseOptions, delegate: 'CPU' },
    });
  }
}

function getDetector(): Promise<FaceDetector> {
  if (!detectorPromise) {
    detectorPromise = createDetector().catch((error) => {
      detectorPromise = null;
      throw error;
    });
  }
  return detectorPromise;
}

/**
 * Detects faces in `source` and returns line-style findings, so the editor can
 * reuse the same suggestion banner it uses for OCR matches.
 */
export async function detectFaces(
  source: HTMLCanvasElement,
  onProgress: (label: string, percent: number) => void
): Promise<Finding[]> {
  onProgress('Loading the face model…', 10);
  const detector = await getDetector();

  onProgress('Looking for faces on your device…', 56);
  // Let the busy overlay paint before the synchronous inference call.
  await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));

  const scale = Math.min(1, MAX_DETECT_EDGE / Math.max(source.width, source.height));
  const width = Math.max(1, Math.round(source.width * scale));
  const height = Math.max(1, Math.round(source.height * scale));

  const input = document.createElement('canvas');
  input.width = width;
  input.height = height;
  const context = input.getContext('2d');
  if (!context) throw new Error('Canvas is unavailable');
  context.imageSmoothingEnabled = true;
  context.imageSmoothingQuality = 'high';
  context.drawImage(source, 0, 0, width, height);

  const result = detector.detect(input);
  const inverse = 1 / scale;
  const boxes: Array<{ x: number; y: number; w: number; h: number; score: number }> = [];

  for (const detection of result.detections ?? []) {
    const box = detection.boundingBox;
    if (!box || box.width < 8 || box.height < 8) continue;

    const score = Number(detection.categories?.[0]?.score ?? 0);
    if (score < MIN_CONFIDENCE) continue;

    const padX = box.width * BOX_PADDING;
    const padY = box.height * BOX_PADDING;
    const left = Math.max(0, (box.originX - padX) * inverse);
    const top = Math.max(0, (box.originY - padY) * inverse);
    const right = Math.min(source.width, (box.originX + box.width + padX) * inverse);
    const bottom = Math.min(source.height, (box.originY + box.height + padY) * inverse);
    if (right - left < 12 || bottom - top < 12) continue;

    boxes.push({ x: left, y: top, w: right - left, h: bottom - top, score });
  }

  boxes.sort((a, b) => a.y - b.y || a.x - b.x);

  return boxes.map((box, index) => ({
    x: box.x,
    y: box.y,
    w: box.w,
    h: box.h,
    text: `Face ${index + 1}`,
    kind: 'Face',
    sensitive: true,
    confidence: Math.round(box.score * 100),
  }));
}

export function disposeFaceDetector(): void {
  if (!detectorPromise) return;
  detectorPromise.then((detector) => detector.close()).catch(() => {});
  detectorPromise = null;
}

if (typeof window !== 'undefined') {
  window.addEventListener('pagehide', disposeFaceDetector, { once: true });
}
