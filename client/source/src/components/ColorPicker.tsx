import { useState } from 'react';
import { ChromePicker, ColorResult, RGBColor } from 'react-color';

export function ColorPicker() {
  const [color, setColor] = useState<RGBColor>({ r: 0, g: 0, b: 0, a: 1 });
  const handleChange = (c: ColorResult) => setColor(c.rgb);

  return (
    <ChromePicker
      color={color}
      onChange={handleChange}
      onChangeComplete={c => console.log(c.rgb)}
    />
  );
}
