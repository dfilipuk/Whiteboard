import React from 'react';
import './Whiteboard.css'

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

export function Whiteboard() {
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
        onMouseDown={startDrawing}
        onMouseMove={continueDrawing}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
      />
    </div>
  );
}

function startDrawing(e: React.MouseEvent) {
  drawing = true;
  currentPoint = fromClientToOffsetCoordinates(e.clientX, e.clientY);
}

function continueDrawing(e: React.MouseEvent) {
  if (!drawing) return;
  const newPoint = fromClientToOffsetCoordinates(e.clientX, e.clientY);
  drawLine(currentPoint, newPoint);
  currentPoint = newPoint;
}

function stopDrawing(e: React.MouseEvent) {
  if (!drawing) return;
  drawing = false;
  const newPoint = fromClientToOffsetCoordinates(e.clientX, e.clientY);
  drawLine(currentPoint, newPoint);
}

function fromClientToOffsetCoordinates(x: number, y: number): Point {
  let rect = canvas?.current?.getBoundingClientRect();
  return new Point(x - (rect?.left ?? 0), y - (rect?.top ?? 0))
}

function drawLine(from: Point, to: Point){
  if (!context) return;

  context.beginPath();
  context.moveTo(from.x, from.y);
  context.lineTo(to.x, to.y);
  context.strokeStyle = 'black';
  context.lineWidth = 2;
  context.stroke();
  context.closePath();
}

async function resizeCanvas() {
  if (canvas?.current && whiteboard?.current) {
    const image = context?.getImageData(0, 0, canvas.current.width, canvas.current.height);

    canvas.current.width = whiteboard.current.clientWidth;
    canvas.current.height = whiteboard.current.clientHeight;

    if (image) {
      const bitmap = await createImageBitmap(image);
      image && context?.drawImage(bitmap, 0, 0);
    }
  }
}
