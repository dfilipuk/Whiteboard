import React, { useCallback } from 'react';
import Slider from 'rc-slider';
import styled from 'styled-components';

import { Size } from 'stores';
import { MIN_PEN_SIZE, MAX_PEN_SIZE } from 'constants/drawing';

import 'rc-slider/assets/index.css';

const Container = styled.div`
  padding: 0.1em 0.2em;
  border-radius: 0.1em;
`;

type Props = {
  className?: string;
  size: Size;
};

const SizePicker: React.FC<Props> = ({ className, size }) => {
  const SliderWithTooltip = Slider.createSliderWithTooltip(Slider);

  const formatTip = useCallback((value: number) => `${value}px`, []);
  const updateValue = useCallback((value: number) => size.setValue(value), [size]);

  return (
    <Container className={className}>
      <SliderWithTooltip
        min={MIN_PEN_SIZE}
        max={MAX_PEN_SIZE}
        defaultValue={size.value}
        tipFormatter={formatTip}
        onAfterChange={updateValue}
      />
    </Container>
  );
};

export { SizePicker };
