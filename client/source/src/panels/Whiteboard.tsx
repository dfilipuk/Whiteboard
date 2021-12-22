import React, { useCallback, useEffect, useRef, useState } from 'react';
import { observer } from 'mobx-react-lite';
import styled from 'styled-components';

import { Point } from 'models';
import { useWindowEvents } from 'services';
import { DrawingSettings } from 'stores';
import { drawLine, fromClientToOffsetCoordinates, resizeCanvas } from 'utils';

const Container = styled.div`
  grid-area: 1 / 2 / 1 / 2;
  margin: 0.5em;
  border-radius: 0.3em;
  box-shadow: 0 0 1em 0.2em gray;
`;

const Canvas = styled.canvas<{ backgroundColor: string }>`
  position: absolute;
  background-color: ${(props) => props.backgroundColor};
`;

type Props = {
  drawingSettings: DrawingSettings;
};

const Whiteboard: React.FC<Props> = observer(({ drawingSettings }) => {
  const { penSize, penColor, backgroundColor } = drawingSettings;

  const { resize } = useWindowEvents();

  const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null);
  const [context, setContext] = useState<CanvasRenderingContext2D | null | undefined>(null);
  const [container, setContainer] = useState<HTMLDivElement | null>(null);

  const drawing = useRef<boolean>(false);
  const currentPoint = useRef<Point>(new Point(0, 0));

  const setupCanvasNode = useCallback((node) => setCanvas(node), []);
  const setupContainerNode = useCallback((node) => setContainer(node), []);

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
        drawLine(context, currentPoint.current, newPoint, penColor.value, penSize.value);
        currentPoint.current = newPoint;
      }
    },
    [canvas, context, penColor.value, penSize.value]
  );

  const stopDrawing = useCallback(
    (point: Point) => {
      if (drawing.current && canvas && context) {
        drawing.current = false;
        const newPoint = fromClientToOffsetCoordinates(canvas, point);
        drawLine(context, currentPoint.current, newPoint, penColor.value, penSize.value);
      }
    },
    [canvas, context, penColor.value, penSize.value]
  );

  useEffect(() => {
    if (resize && canvas && container && context) {
      resizeCanvas(canvas, container, context);
    }
  }, [resize, canvas, container, context]);

  useEffect(() => {
    if (canvas) {
      setContext(canvas.getContext('2d'));
    } else {
      setContext(null);
    }
  }, [canvas]);

  return (
    <Container ref={setupContainerNode}>
      <Canvas
        ref={setupCanvasNode}
        backgroundColor={backgroundColor.value}
        onMouseDown={(e) => startDrawing(new Point(e.clientX, e.clientY))}
        onMouseMove={(e) => continueDrawing(new Point(e.clientX, e.clientY))}
        onMouseUp={(e) => stopDrawing(new Point(e.clientX, e.clientY))}
        onMouseOut={(e) => stopDrawing(new Point(e.clientX, e.clientY))}
        onTouchStart={(e) => startDrawing(new Point(e.touches[0].clientX, e.touches[0].clientY))}
        onTouchMove={(e) => continueDrawing(new Point(e.touches[0].clientX, e.touches[0].clientY))}
        onTouchEnd={(e) => stopDrawing(new Point(e.touches[0].clientX, e.touches[0].clientY))}
        onTouchCancel={(e) => stopDrawing(new Point(e.touches[0].clientX, e.touches[0].clientY))}
      />
    </Container>
  );
});

export { Whiteboard };
