import React, { useCallback } from 'react';
import Slider from 'rc-slider';
import styled from 'styled-components';

import 'rc-slider/assets/index.css';

const Container = styled.div`
  padding: 0.1em 0.2em;
  border-radius: 0.1em;
`;

type Props = {
  className?: string;
};

const SizePicker: React.FC<Props> = ({ className }) => {
  const SliderWithTooltip = Slider.createSliderWithTooltip(Slider);

  const formatTip = useCallback((value: number) => `${value}px`, []);
  const updateValue = useCallback((value: number) => console.log(value), []);

  return (
    <Container className={className}>
      <SliderWithTooltip
        min={1}
        max={100}
        defaultValue={1}
        tipFormatter={formatTip}
        onAfterChange={updateValue}
      />
    </Container>
  );
};

export { SizePicker };
