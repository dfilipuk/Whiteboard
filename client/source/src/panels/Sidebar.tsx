import React, { useCallback, useState } from 'react';
import styled from 'styled-components';

import { ColorPicker, SizePicker } from 'components';

const Container = styled.div`
  grid-area: 1 / 1 / 1 / 1;

  display: grid;
  grid-template-rows: repeat(3, auto) 1fr;
  grid-template-columns: repeat(2, auto);
  font-size: 2.5em;
`;

const Button = styled.i<{ num: number }>`
  cursor: pointer;
  margin: 0.2em 0.15em 0 0.2em;
  background-color: #f0f0f0;
  border-radius: 0.2em;
  grid-column: 1 / span 1;
  grid-row: ${(props) => props.num} / span 1;
`;

const PopUp = styled.div<{ num: number }>`
  z-index: 1;
  grid-column: 2 / span 1;
  grid-row: ${(props) => props.num} / span 1;
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

const Sidebar: React.FC = () => {
  const [currentPopUp, setCurrentPopUp] = useState<PopUpKind | null>(null);

  const togglePopUp = useCallback(
    (popup: PopUpKind) => setCurrentPopUp(currentPopUp === popup ? null : popup),
    [currentPopUp]
  );

  return (
    <Container>
      <Button num={1} className="las la-pen" onClick={() => togglePopUp(PopUpKind.PenColor)} />
      <Button
        num={2}
        className="las la-pencil-ruler"
        onClick={() => togglePopUp(PopUpKind.PenSize)}
      />
      <Button
        num={3}
        className="las la-fill-drip"
        onClick={() => togglePopUp(PopUpKind.BackgroundColor)}
      />

      {currentPopUp === PopUpKind.PenColor && (
        <PopUp num={1}>
          <StyledColorPicker />
        </PopUp>
      )}
      {currentPopUp === PopUpKind.PenSize && (
        <PenSizePopUp num={2}>
          <StyledSizePicker />
        </PenSizePopUp>
      )}
      {currentPopUp === PopUpKind.BackgroundColor && (
        <PopUp num={3}>
          <StyledColorPicker />
        </PopUp>
      )}
    </Container>
  );
};

export { Sidebar };
