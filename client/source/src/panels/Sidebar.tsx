import React, { useCallback, useState } from 'react';
import { observer } from 'mobx-react-lite';
import styled from 'styled-components';

import { ColorPicker, SizePicker } from 'components';
import { GlobalDrawingSettings } from 'stores';

const Container = styled.div`
  grid-area: 1 / 1 / 1 / 1;

  display: grid;
  grid-template-rows: repeat(3, auto) 1fr;
  grid-template-columns: repeat(2, auto);
  font-size: 2.5em;
`;

const Button = styled.i<{ position: number; color?: string }>`
  cursor: pointer;
  margin: 0.2em 0.15em 0 0.2em;
  background-color: #dadada;
  border-radius: 0.2em;
  grid-column: 1 / span 1;
  grid-row: ${(props) => props.position} / span 1;
  color: ${(props) => props.color};
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

enum PopUpKind {
  PenColor,
  PenSize,
  BackgroundColor,
}

type Props = {
  settings: GlobalDrawingSettings;
};

const Sidebar: React.FC<Props> = observer(({ settings }) => {
  const [currentPopUp, setCurrentPopUp] = useState<PopUpKind | null>(null);

  const togglePopUp = useCallback(
    (popup: PopUpKind) => setCurrentPopUp(currentPopUp === popup ? null : popup),
    [currentPopUp]
  );

  return (
    <Container>
      <Button position={1} className="las la-pen" onClick={() => togglePopUp(PopUpKind.PenColor)} />
      <Button
        position={2}
        className="las la-pencil-ruler"
        onClick={() => togglePopUp(PopUpKind.PenSize)}
      />
      <Button
        position={3}
        color={settings.backgroundColor.value}
        className="las la-fill-drip"
        onClick={() => togglePopUp(PopUpKind.BackgroundColor)}
      />

      {/* {currentPopUp === PopUpKind.PenColor && (
        <PopUp position={1}>
          <StyledColorPicker />
        </PopUp>
      )} */}
      {currentPopUp === PopUpKind.PenSize && (
        <PenSizePopUp position={2}>
          <StyledSizePicker />
        </PenSizePopUp>
      )}
      {currentPopUp === PopUpKind.BackgroundColor && (
        <PopUp position={3}>
          <StyledColorPicker color={settings.backgroundColor} />
        </PopUp>
      )}
    </Container>
  );
});

export { Sidebar };
