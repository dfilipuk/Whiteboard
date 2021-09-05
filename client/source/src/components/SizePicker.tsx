import React, { useCallback } from 'react';
import Slider from 'rc-slider';

import 'rc-slider/assets/index.css';

const SizePicker: React.FC = () => {
  const SliderWithTooltip = Slider.createSliderWithTooltip(Slider);

  const formatTip = useCallback((value: number) => `${value}px`, []);
  const updateValue = useCallback((value: number) => console.log(value), []);

  return (
    <SliderWithTooltip
      min={1}
      max={100}
      defaultValue={1}
      tipFormatter={formatTip}
      onAfterChange={updateValue}
    />
  );
};

export { SizePicker };
