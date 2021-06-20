import 'rc-slider/assets/index.css';
import Slider from 'rc-slider';

export function SizePicker() {
  const SliderWithTooltip = Slider.createSliderWithTooltip(Slider);
  return (
    <SliderWithTooltip
      min={1}
      max={100}
      defaultValue={1}
      tipFormatter={v => `${v}px`}
      onAfterChange={v => console.log(v)}
    />
  );
}
