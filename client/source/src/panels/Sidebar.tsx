import React, { MouseEvent, useCallback, useEffect } from 'react';
import { autorun } from 'mobx';
import { observer } from 'mobx-react-lite';
import styled from 'styled-components';

import { Button, ColorPicker, SizePicker } from 'components';
import { MIN_PEN_SIZE, MAX_PEN_SIZE } from 'constants/drawing';
import { useWorkspaceStores } from 'hooks';
import { FocusTarget, PopUpKind } from 'stores';

import { ServerStatus } from './ServerStatus';

const Container = styled.div`
  grid-area: 1 / 1 / 1 / 1;

  display: grid;
  grid-template-rows: repeat(3, auto) 1fr auto;
  grid-template-columns: repeat(2, auto);
  font-size: 2.5em;
`;

const StyledButton = styled(Button)<{ position: number }>`
  margin: 0.2em 0.15em 0 0.2em;
  grid-column: 1 / span 1;
  grid-row: ${(props) => props.position} / span 1;
`;

const StyledServerStatus = styled(ServerStatus)`
  grid-area: 5 / 1 / 6 / 1;
  margin: 0.2em 0.15em 0.2em 0.2em;
`;

const PopUp = styled.div<{ position: number }>`
  z-index: 1;
  grid-column: 2 / span 1;
  grid-row: ${(props) => props.position} / span 1;
`;

const PenSizePopUp = styled(PopUp)`
  margin-top: 0.2em;
  display: flex;
  align-items: center;
`;

const StyledColorPicker = styled(ColorPicker)`
  position: absolute;
  margin: 0.2em 0 0 0.1em;
`;

const StyledSizePicker = styled(SizePicker)`
  position: absolute;
  margin-left: 0.1em;
  width: 5em;
  background-color: white;
  box-shadow: 0 0 0.15em 0.01em gray;
`;

const Sidebar: React.FC = observer(() => {
  const { drawingSettings, workspaceState } = useWorkspaceStores();
  const { penSize, penColor, backgroundColor } = drawingSettings;

  const togglePopUp = useCallback(
    (popUp: PopUpKind) => {
      if (workspaceState.popUp === popUp) {
        workspaceState.setPopUp(null);
        workspaceState.setFocus(FocusTarget.Sidebar);
      } else {
        workspaceState.setPopUp(popUp);
        workspaceState.setFocus(FocusTarget.PopUp);
      }
    },
    [workspaceState]
  );
  const togglePenColor = useCallback(() => togglePopUp(PopUpKind.PenColor), [togglePopUp]);
  const togglePenSize = useCallback(() => togglePopUp(PopUpKind.PenSize), [togglePopUp]);
  const toggleBackgroundColor = useCallback(
    () => togglePopUp(PopUpKind.BackgroundColor),
    [togglePopUp]
  );

  const setPenSize = useCallback((size: number) => penSize.setValue(size), [penSize]);
  const setPenColor = useCallback((color: string) => penColor.setValue(color), [penColor]);
  const setBackgroundColor = useCallback(
    (color: string) => backgroundColor.setValue(color),
    [backgroundColor]
  );

  const setFocusToSidebar = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) {
        workspaceState.setFocus(FocusTarget.Sidebar);
      }
    },
    [workspaceState]
  );

  useEffect(() =>
    autorun(() => {
      if (workspaceState.focus !== FocusTarget.PopUp) {
        workspaceState.setPopUp(null);
      }
    })
  );

  return (
    <Container onClick={setFocusToSidebar}>
      <StyledButton
        position={1}
        color={penColor.value}
        icon="las la-pen"
        onClick={togglePenColor}
      />
      <StyledButton
        position={2}
        color={penColor.value}
        icon="las la-pencil-ruler"
        onClick={togglePenSize}
      />
      <StyledButton
        position={3}
        color={backgroundColor.value}
        icon="las la-fill-drip"
        onClick={toggleBackgroundColor}
      />

      <StyledServerStatus />

      {workspaceState.popUp === PopUpKind.PenColor && (
        <PopUp position={1}>
          <StyledColorPicker initialColor={penColor.value} onChange={setPenColor} />
        </PopUp>
      )}
      {workspaceState.popUp === PopUpKind.PenSize && (
        <PenSizePopUp position={2}>
          <StyledSizePicker
            initialSize={penSize.value}
            minSize={MIN_PEN_SIZE}
            maxSize={MAX_PEN_SIZE}
            onChange={setPenSize}
          />
        </PenSizePopUp>
      )}
      {workspaceState.popUp === PopUpKind.BackgroundColor && (
        <PopUp position={3}>
          <StyledColorPicker initialColor={backgroundColor.value} onChange={setBackgroundColor} />
        </PopUp>
      )}
    </Container>
  );
});

export { Sidebar };
