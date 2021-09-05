import React from 'react';

import './Whiteboard.css';

class Point {
  public x: number;

  public y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

let drawing = false;
let currentPoint = new Point(0, 0);

let canvas: React.RefObject<HTMLCanvasElement> | null = null;
let context: CanvasRenderingContext2D | null | undefined = null;
let whiteboard: React.RefObject<HTMLDivElement> | null = null;

function fromClientToOffsetCoordinates(point: Point): Point {
  let rect = canvas?.current?.getBoundingClientRect();
  return new Point(point.x - (rect?.left ?? 0), point.y - (rect?.top ?? 0));
}

function drawLine(from: Point, to: Point) {
  if (!context) return;

  context.beginPath();
  context.moveTo(from.x, from.y);
  context.lineTo(to.x, to.y);
  context.strokeStyle = 'black';
  context.lineWidth = 2;
  context.stroke();
  context.closePath();
}

function startDrawing(point: Point) {
  drawing = true;
  currentPoint = fromClientToOffsetCoordinates(point);
}

function continueDrawing(point: Point) {
  if (!drawing) return;
  const newPoint = fromClientToOffsetCoordinates(point);
  drawLine(currentPoint, newPoint);
  currentPoint = newPoint;
}

function stopDrawing(point: Point) {
  if (!drawing) return;
  drawing = false;
  const newPoint = fromClientToOffsetCoordinates(point);
  drawLine(currentPoint, newPoint);
}

async function resizeCanvas() {
  if (canvas?.current && whiteboard?.current) {
    const image = context?.getImageData(0, 0, canvas.current.width, canvas.current.height);

    canvas.current.width = whiteboard.current.clientWidth;
    canvas.current.height = whiteboard.current.clientHeight;

    if (image) {
      const bitmap = await createImageBitmap(image);
      if (image) {
        context?.drawImage(bitmap, 0, 0);
      }
    }
  }
}

const Whiteboard: React.FC = () => {
  canvas = React.useRef<HTMLCanvasElement>(null);
  whiteboard = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    context = canvas?.current?.getContext('2d');
    if (canvas?.current && whiteboard?.current) {
      window.addEventListener('resize', resizeCanvas, false);
      resizeCanvas();
    } else {
      window.removeEventListener('resize', resizeCanvas);
    }
  });
  return (
    <div ref={whiteboard} className="whiteboard">
      <canvas
        ref={canvas}
        className="whiteboard__canvas"
        onMouseDown={(e) => startDrawing(new Point(e.clientX, e.clientY))}
        onMouseMove={(e) => continueDrawing(new Point(e.clientX, e.clientY))}
        onMouseUp={(e) => stopDrawing(new Point(e.clientX, e.clientY))}
        onMouseOut={(e) => stopDrawing(new Point(e.clientX, e.clientY))}
        onTouchStart={(e) => startDrawing(new Point(e.touches[0].clientX, e.touches[0].clientY))}
        onTouchMove={(e) => continueDrawing(new Point(e.touches[0].clientX, e.touches[0].clientY))}
        onTouchEnd={(e) => stopDrawing(new Point(e.touches[0].clientX, e.touches[0].clientY))}
        onTouchCancel={(e) => stopDrawing(new Point(e.touches[0].clientX, e.touches[0].clientY))}
      />
    </div>
  );
};

export { Whiteboard };
