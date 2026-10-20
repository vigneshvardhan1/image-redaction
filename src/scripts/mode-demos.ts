import { drawShape, type Mode } from './render';

const canvases = Array.from(document.querySelectorAll<HTMLCanvasElement>('[data-mode-demo]'));

if (canvases.length) {
  const image = new Image();
  const ready = new Promise<void>((resolve, reject) => {
    image.onload = () => resolve();
    image.onerror = () => reject(new Error('Sample failed to load'));
  });
  image.src = '/samples/id.svg';

  ready
    .then(() => {
      const width = 800;
      const height = 500;

      canvases.forEach((canvas) => {
        const mode = canvas.dataset.modeDemo as Mode | undefined;
        if (!mode) return;

        canvas.width = width;
        canvas.height = height;
        const context = canvas.getContext('2d');
        if (!context) return;

        context.fillStyle = '#dfdcd4';
        context.fillRect(0, 0, width, height);

        // The whole card, framed with a small margin so nothing runs off the edge.
        context.imageSmoothingQuality = 'high';
        context.drawImage(image, 110, 80, 980, 612.5, 0, 0, width, height);

        drawShape(context, canvas, {
          id: 0,
          mode,
          kind: 'rect',
          x: width * 0.395,
          y: height * 0.30,
          w: width * 0.51,
          h: height * 0.31,
          emoji: '😎',
        });
      });
    })
    .catch((error) => {
      console.error(error);
    });
}
