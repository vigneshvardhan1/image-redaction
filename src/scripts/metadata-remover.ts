/**
 * Metadata remover: decode an image, paint it onto a canvas, and export a new
 * file. Canvas encoding writes pixels only — the EXIF, GPS, XMP, and camera
 * blocks from the original file are never copied into the download.
 *
 * The component is optional, so every lookup is guarded.
 */

const MAX_BYTES = 25 * 1024 * 1024;

interface OutputFormat {
  mime: string;
  extension: string;
}

interface LoadedImage {
  bitmap: ImageBitmap | HTMLImageElement;
  width: number;
  height: number;
  objectUrl?: string;
}

const root = document.querySelector<HTMLElement>('[data-metadata-remover]');

if (root) {
  const dropzone = root.querySelector<HTMLElement>('[data-meta-dropzone]');
  const empty = root.querySelector<HTMLElement>('[data-meta-empty]');
  const ready = root.querySelector<HTMLElement>('[data-meta-ready]');
  const input = root.querySelector<HTMLInputElement>('[data-meta-input]');
  const choose = root.querySelector<HTMLButtonElement>('[data-meta-choose]');
  const clean = root.querySelector<HTMLButtonElement>('[data-meta-clean]');
  const cleanLabel = root.querySelector<HTMLElement>('[data-meta-clean-label]');
  const reset = root.querySelector<HTMLButtonElement>('[data-meta-reset]');
  const filename = root.querySelector<HTMLElement>('[data-meta-filename]');
  const name = root.querySelector<HTMLElement>('[data-meta-name]');
  const details = root.querySelector<HTMLElement>('[data-meta-details]');
  const preview = root.querySelector<HTMLImageElement>('[data-meta-preview]');
  const status = root.querySelector<HTMLElement>('[data-meta-status]');

  let currentFile: File | null = null;
  let currentPreviewUrl: string | null = null;
  let busy = false;

  function setStatus(message: string): void {
    if (status) status.textContent = message;
  }

  function formatBytes(bytes: number): string {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }

  function baseName(file: File): string {
    return file.name.replace(/\.[^.]+$/, '') || 'image';
  }

  function outputFormat(file: File): OutputFormat {
    if (file.type === 'image/jpeg') return { mime: 'image/jpeg', extension: 'jpg' };
    if (file.type === 'image/webp') return { mime: 'image/webp', extension: 'webp' };
    // PNG is lossless and universally encodable. GIF, BMP, and AVIF are
    // converted rather than risk a browser refusing to encode their format.
    return { mime: 'image/png', extension: 'png' };
  }

  function clearPreviewUrl(): void {
    if (currentPreviewUrl) {
      URL.revokeObjectURL(currentPreviewUrl);
      currentPreviewUrl = null;
    }
  }

  function resetState(): void {
    currentFile = null;
    clearPreviewUrl();
    if (input) input.value = '';
    if (empty) empty.hidden = false;
    if (ready) ready.hidden = true;
    if (filename) filename.textContent = 'No file open';
    if (preview) preview.removeAttribute('src');
    if (name) name.textContent = '';
    if (details) details.textContent = '';
    setStatus('');
    if (clean) clean.disabled = false;
    if (cleanLabel) cleanLabel.textContent = 'Remove metadata & download';
  }

  function showFile(file: File): void {
    if (!file.type.startsWith('image/')) {
      setStatus('That file is not an image. Choose a JPG, PNG, WebP, GIF, BMP, or AVIF.');
      return;
    }

    if (file.size > MAX_BYTES) {
      setStatus(`That image is ${formatBytes(file.size)}. The limit is 25 MB.`);
      return;
    }

    currentFile = file;
    clearPreviewUrl();
    currentPreviewUrl = URL.createObjectURL(file);

    if (empty) empty.hidden = true;
    if (ready) ready.hidden = false;
    if (filename) filename.textContent = file.name;
    if (name) name.textContent = file.name;
    if (preview) {
      preview.src = currentPreviewUrl;
      preview.alt = `Preview of ${file.name}`;
    }
    setStatus('Photo loaded locally. Nothing has been uploaded.');

    // Decode once to show the real pixel dimensions and to catch files the
    // browser cannot read before the visitor clicks download.
    const url = currentPreviewUrl;
    const image = new Image();
    image.onload = () => {
      if (!currentFile || currentFile !== file) return;
      if (details) {
        details.textContent = `${image.naturalWidth} × ${image.naturalHeight} px · ${formatBytes(
          file.size
        )} · ${outputFormat(file).extension.toUpperCase()} export`;
      }
    };
    image.onerror = () => {
      if (currentFile !== file) return;
      setStatus('This browser could not read that image. Try a JPG or PNG copy.');
    };
    image.src = url;
  }

  function openPicker(): void {
    input?.click();
  }

  choose?.addEventListener('click', openPicker);

  input?.addEventListener('change', () => {
    const file = input.files?.[0];
    if (file) showFile(file);
  });

  reset?.addEventListener('click', () => {
    resetState();
    openPicker();
  });

  // Drag and drop on the dropzone only, so dropping a file elsewhere on the
  // page never navigates away from the editor.
  if (dropzone) {
    let depth = 0;

    function setDragActive(on: boolean): void {
      dropzone.classList.toggle('border-ink', on);
      dropzone.classList.toggle('bg-canvas', on);
      dropzone.classList.toggle('border-hairline', !on);
      dropzone.classList.toggle('bg-canvas-soft/60', !on);
    }

    dropzone.addEventListener('dragenter', (event) => {
      event.preventDefault();
      depth += 1;
      setDragActive(true);
    });
    dropzone.addEventListener('dragover', (event) => {
      event.preventDefault();
    });
    dropzone.addEventListener('dragleave', () => {
      depth = Math.max(0, depth - 1);
      if (depth === 0) setDragActive(false);
    });
    dropzone.addEventListener('drop', (event) => {
      event.preventDefault();
      depth = 0;
      setDragActive(false);
      const file = event.dataTransfer?.files?.[0];
      if (file) showFile(file);
    });
  }

  async function decode(file: File): Promise<LoadedImage> {
    if ('createImageBitmap' in window) {
      try {
        const bitmap = await createImageBitmap(file, { imageOrientation: 'from-image' });
        return { bitmap, width: bitmap.width, height: bitmap.height };
      } catch {
        /* Fall through to the <img> path. */
      }
    }

    const url = URL.createObjectURL(file);
    const image = new Image();
    await new Promise<void>((resolve, reject) => {
      image.onload = () => resolve();
      image.onerror = () => reject(new Error('decode failed'));
      image.src = url;
    });
    return {
      bitmap: image,
      width: image.naturalWidth,
      height: image.naturalHeight,
      objectUrl: url,
    };
  }

  async function cleanAndDownload(): Promise<void> {
    if (!currentFile || busy) return;
    const file = currentFile;
    const format = outputFormat(file);
    const downloadName = `${baseName(file)}-no-metadata.${format.extension}`;

    busy = true;
    if (clean) clean.disabled = true;
    if (cleanLabel) cleanLabel.textContent = 'Rebuilding the file…';
    setStatus('Reading pixels and writing a fresh file locally…');

    let loaded: LoadedImage | null = null;
    try {
      loaded = await decode(file);
      const canvas = document.createElement('canvas');
      canvas.width = loaded.width;
      canvas.height = loaded.height;
      const context = canvas.getContext('2d');
      if (!context) throw new Error('canvas unavailable');
      context.drawImage(loaded.bitmap, 0, 0);

      const blob = await new Promise<Blob | null>((resolve) => {
        canvas.toBlob(resolve, format.mime, format.mime === 'image/png' ? undefined : 0.92);
      });
      if (!blob) throw new Error('encode failed');

      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = downloadName;
      document.body.appendChild(link);
      link.click();
      link.remove();
      setTimeout(() => URL.revokeObjectURL(url), 10_000);

      if (cleanLabel) cleanLabel.textContent = 'Download again';
      setStatus(
        `Saved ${downloadName} (${formatBytes(blob.size)}). The new file contains the visible pixels only — the original EXIF, GPS, and camera metadata were not copied.`
      );
    } catch {
      if (cleanLabel) cleanLabel.textContent = 'Remove metadata & download';
      setStatus(
        'The browser could not rebuild this image. Try again with a JPG or PNG, or use a screenshot of the photo.'
      );
    } finally {
      if (loaded?.objectUrl) URL.revokeObjectURL(loaded.objectUrl);
      if (loaded && 'close' in loaded.bitmap) loaded.bitmap.close();
      busy = false;
      if (clean) clean.disabled = false;
    }
  }

  clean?.addEventListener('click', () => void cleanAndDownload());

  // Escape clears a selected file, matching the editor's habit.
  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;
    if (root.contains(document.activeElement)) resetState();
  });
}
