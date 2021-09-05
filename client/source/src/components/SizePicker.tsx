import React from 'react';
import Slider from 'rc-slider';

import 'rc-slider/assets/index.css';

const SizePicker: React.FC = () => {
  const SliderWithTooltip = Slider.createSliderWithTooltip(Slider);
  return (
    <SliderWithTooltip
      min={1}
      max={100}
      defaultValue={1}
      tipFormatter={(v) => `${v}px`}
      onAfterChange={(v) => console.log(v)}
    />
  );
};

export { SizePicker };
