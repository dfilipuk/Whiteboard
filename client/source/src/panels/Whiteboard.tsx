import React, { useCallback, useEffect, useRef, useState } from 'react';

import { Point } from 'models';
import { drawLine, fromClientToOffsetCoordinates, resizeCanvas, useWindowEvents } from 'utils';

import './Whiteboard.css';

const Whiteboard: React.FC = () => {
  const { resize } = useWindowEvents();

  const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null);
  const [context, setContext] = useState<CanvasRenderingContext2D | null | undefined>(null);
  const [whiteboard, setWhiteboard] = useState<HTMLDivElement | null>(null);

  const drawing = useRef<boolean>(false);
  const currentPoint = useRef<Point>(new Point(0, 0));

  const setupCanvasNode = useCallback((node) => setCanvas(node), []);
  const setupWhiteboardNode = useCallback((node) => setWhiteboard(node), []);

  const startDrawing = useCallback(
    (point: Point) => {
      if (canvas) {
        drawing.current = true;
        currentPoint.current = fromClientToOffsetCoordinates(canvas, point);
      }
    },
    [canvas]
  );

  const continueDrawing = useCallback(
    (point: Point) => {
      if (drawing.current && canvas && context) {
        const newPoint = fromClientToOffsetCoordinates(canvas, point);
        drawLine(context, currentPoint.current, newPoint);
        currentPoint.current = newPoint;
      }
    },
    [canvas, context]
  );

  const stopDrawing = useCallback(
    (point: Point) => {
      if (drawing.current && canvas && context) {
        drawing.current = false;
        const newPoint = fromClientToOffsetCoordinates(canvas, point);
        drawLine(context, currentPoint.current, newPoint);
      }
    },
    [canvas, context]
  );

  useEffect(() => {
    if (resize && canvas && whiteboard && context) {
      resizeCanvas(canvas, whiteboard, context);
    }
  }, [resize, canvas, whiteboard, context]);

  useEffect(() => {
    if (canvas) {
      setContext(canvas.getContext('2d'));
    } else {
      setContext(null);
    }
  }, [canvas]);

  return (
    <div ref={setupWhiteboardNode} className="whiteboard">
      <canvas
        ref={setupCanvasNode}
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
