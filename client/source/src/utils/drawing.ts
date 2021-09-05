import { Point } from 'models';

async function resizeCanvas(
  canvas: HTMLCanvasElement,
  canvasContainer: HTMLDivElement,
  drawingContext: CanvasRenderingContext2D
) {
  if (canvas && canvasContainer) {
    const image = drawingContext.getImageData(0, 0, canvas.width, canvas.height);

    canvas.width = canvasContainer.clientWidth;
    canvas.height = canvasContainer.clientHeight;

    if (image) {
      const bitmap = await createImageBitmap(image);
      if (image) {
        drawingContext.drawImage(bitmap, 0, 0);
      }
    }
  }
}

function drawLine(drawingContext: CanvasRenderingContext2D, from: Point, to: Point) {
  drawingContext.beginPath();
  drawingContext.moveTo(from.x, from.y);
  drawingContext.lineTo(to.x, to.y);
  drawingContext.strokeStyle = 'black';
  drawingContext.lineWidth = 2;
  drawingContext.stroke();
  drawingContext.closePath();
}

function fromClientToOffsetCoordinates(canvas: HTMLCanvasElement, point: Point): Point {
  let rect = canvas.getBoundingClientRect();
  return new Point(point.x - (rect?.left ?? 0), point.y - (rect?.top ?? 0));
}

export { resizeCanvas, drawLine, fromClientToOffsetCoordinates };
