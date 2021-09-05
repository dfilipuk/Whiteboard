import React, { useCallback, useState } from 'react';
import { ChromePicker, ColorResult, RGBColor } from 'react-color';

const ColorPicker: React.FC = () => {
  const [color, setColor] = useState<RGBColor>({ r: 0, g: 0, b: 0, a: 1 });

  const updateColor = useCallback((newColor: ColorResult) => setColor(newColor.rgb), []);
  const submitColor = useCallback((newColor: ColorResult) => console.log(newColor.rgb), []);

  return <ChromePicker color={color} onChange={updateColor} onChangeComplete={submitColor} />;
};

export { ColorPicker };
