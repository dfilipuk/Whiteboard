import { Line, Point } from 'models';

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

function drawLine(drawingContext: CanvasRenderingContext2D, line: Line) {
  drawingContext.beginPath();
  drawingContext.moveTo(line.From.X, line.From.Y);
  drawingContext.strokeStyle = line.Color;
  drawingContext.lineWidth = line.Width;
  drawingContext.lineTo(line.To.X, line.To.Y);
  drawingContext.stroke();
  drawingContext.closePath();
}

function fromClientToOffsetCoordinates(canvas: HTMLCanvasElement, point: Point): Point {
  let rect = canvas.getBoundingClientRect();
  return { X: point.X - (rect?.left ?? 0), Y: point.Y - (rect?.top ?? 0) };
}

export { resizeCanvas, drawLine, fromClientToOffsetCoordinates };
