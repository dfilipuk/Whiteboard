import React, { useCallback } from 'react';
import Slider from 'rc-slider';
import styled from 'styled-components';

import { Size } from 'stores';

import 'rc-slider/assets/index.css';

const Container = styled.div`
  padding: 0.1em 0.2em;
  border-radius: 0.1em;
`;

type Props = {
  className?: string;
  size: Size;
  minSize: number;
  maxSize: number;
};

const SizePicker: React.FC<Props> = ({ className, size, minSize, maxSize }) => {
  const SliderWithTooltip = Slider.createSliderWithTooltip(Slider);

  const formatTip = useCallback((value: number) => `${value}px`, []);
  const updateValue = useCallback((value: number) => size.setValue(value), [size]);

  return (
    <Container className={className}>
      <SliderWithTooltip
        min={minSize}
        max={maxSize}
        defaultValue={size.value}
        tipFormatter={formatTip}
        onAfterChange={updateValue}
      />
    </Container>
  );
};

export { SizePicker };
