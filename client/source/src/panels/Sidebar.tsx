import React, { useCallback, useState } from 'react';
import styled from 'styled-components';

import { ColorPicker, SizePicker } from 'components';
import { PopUp } from 'models';

const Container = styled.div`
  grid-area: 1 / 1 / 1 / 1;

  display: grid;
  grid-template-rows: repeat(3, auto) 1fr;
  grid-template-columns: repeat(2, auto);
  font-size: 2.5em;
`;

const Button = styled.i`
  cursor: pointer;
  margin: 0.2em 0.15em 0 0.2em;
  background-color: #f0f0f0;
  border-radius: 0.2em;
`;

const PenColorButton = styled(Button)`
  grid-area: 1 / 1 / 1 / 1;
`;

const PenSizeButton = styled(Button)`
  grid-area: 2 / 1 / 2 / 1;
`;

const BackgroundColorButton = styled(Button)`
  grid-area: 3 / 1 / 3 / 1;
`;

const PenColorPopUp = styled.div`
  z-index: 1;
  grid-area: 1 / 2 / 1 / 2;
`;

const PenSizePopUp = styled.div`
  z-index: 1;
  grid-area: 2 / 2 / 2 / 2;
  margin-top: 0.2em;
  display: flex;
  align-items: center;
`;

const BackgroundColorPopUp = styled.div`
  z-index: 1;
  grid-area: 3 / 2 / 3 / 2;
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

const Sidebar: React.FC = () => {
  const [currentPopUp, setCurrentPopUp] = useState<PopUp | null>(null);

  const togglePopUp = useCallback(
    (popup: PopUp) => setCurrentPopUp(currentPopUp === popup ? null : popup),
    [currentPopUp]
  );

  return (
    <Container>
      <PenColorButton className="las la-pen" onClick={() => togglePopUp(PopUp.PenColor)} />
      <PenSizeButton className="las la-pencil-ruler" onClick={() => togglePopUp(PopUp.PenSize)} />
      <BackgroundColorButton
        className="las la-fill-drip"
        onClick={() => togglePopUp(PopUp.BackgroundColor)}
      />

      {currentPopUp === PopUp.PenColor && (
        <PenColorPopUp>
          <StyledColorPicker />
        </PenColorPopUp>
      )}
      {currentPopUp === PopUp.PenSize && (
        <PenSizePopUp>
          <StyledSizePicker />
        </PenSizePopUp>
      )}
      {currentPopUp === PopUp.BackgroundColor && (
        <BackgroundColorPopUp>
          <StyledColorPicker />
        </BackgroundColorPopUp>
      )}
    </Container>
  );
};

export { Sidebar };
