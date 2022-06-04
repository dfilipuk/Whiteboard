import React, { useCallback, useEffect, useRef, useState } from 'react';
import { observer } from 'mobx-react-lite';
import styled from 'styled-components';

import { useWorkspaceStores } from 'hooks';
import { Line, Point } from 'models';
import { useWindowEvents, MessageBus } from 'services';
import { FocusTarget } from 'stores';
import { drawLine, fromClientToOffsetCoordinates, resizeCanvas } from 'utils';

const Container = styled.div`
  grid-area: 1 / 2 / 1 / 2;
  margin: 0.5em;
  border-radius: 0.3em;
  box-shadow: 0 0 1em 0.2em gray;
`;

const Canvas = styled.canvas`
  position: absolute;
`;

type Props = {
  inputBus: MessageBus<Line>;
  outputBus: MessageBus<Line>;
};

const Whiteboard: React.FC<Props> = observer(({ inputBus, outputBus }) => {
  const { drawingSettings, workspaceState } = useWorkspaceStores();
  const { penSize, penColor, backgroundColor } = drawingSettings;

  const { resize } = useWindowEvents();

  const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null);
  const [context, setContext] = useState<CanvasRenderingContext2D | null | undefined>(null);
  const [container, setContainer] = useState<HTMLDivElement | null>(null);

  const drawing = useRef<boolean>(false);
  const currentPoint = useRef<Point>({ X: 0, Y: 0 });

  const setupCanvasNode = useCallback((node: HTMLCanvasElement | null) => setCanvas(node), []);
  const setupContainerNode = useCallback((node: HTMLDivElement | null) => setContainer(node), []);

  const setFocus = useCallback(
    () => workspaceState.setFocus(FocusTarget.Whiteboard),
    [workspaceState]
  );

  const initDraw = useCallback(
    (point: Point) => {
      if (canvas) {
        drawing.current = true;
        currentPoint.current = fromClientToOffsetCoordinates(canvas, point);
      }
    },
    [canvas]
  );

  const draw = useCallback(
    (point: Point, stop: boolean) => {
      if (drawing.current && canvas && context) {
        const newPoint = fromClientToOffsetCoordinates(canvas, point);
        const line = {
          From: currentPoint.current,
          To: newPoint,
          Width: penSize.value,
          Color: penColor.value,
        };
        drawLine(context, line);
        outputBus.publish(line);

        if (stop) {
          drawing.current = false;
        } else {
          currentPoint.current = newPoint;
        }
      }
    },
    [canvas, context, outputBus, penColor.value, penSize.value]
  );

  useEffect(() => {
    if (context) {
      const drawMultiple = (lines: Line[]) => lines.forEach((line) => drawLine(context, line));
      inputBus.subscribe(drawMultiple);
      return () => inputBus.unsubscribe();
    }
  }, [context, inputBus]);

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
    <Container ref={setupContainerNode} onMouseDown={setFocus} onTouchStart={setFocus}>
      <Canvas
        ref={setupCanvasNode}
        style={{ backgroundColor: backgroundColor.value }}
        onMouseDown={(e) => initDraw({ X: e.clientX, Y: e.clientY })}
        onMouseMove={(e) => draw({ X: e.clientX, Y: e.clientY }, false)}
        onMouseUp={(e) => draw({ X: e.clientX, Y: e.clientY }, true)}
        onMouseOut={(e) => draw({ X: e.clientX, Y: e.clientY }, true)}
        onTouchStart={(e) => initDraw({ X: e.touches[0].clientX, Y: e.touches[0].clientY })}
        onTouchMove={(e) => draw({ X: e.touches[0].clientX, Y: e.touches[0].clientY }, false)}
        onTouchEnd={(e) => draw({ X: e.touches[0].clientX, Y: e.touches[0].clientY }, true)}
        onTouchCancel={(e) => draw({ X: e.touches[0].clientX, Y: e.touches[0].clientY }, true)}
      />
    </Container>
  );
});

export { Whiteboard };
