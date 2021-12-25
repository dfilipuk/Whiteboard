import React, { useCallback, useState } from 'react';
import { ChromePicker, ColorResult } from 'react-color';

type Props = {
  className?: string;
  initialColor: string;
  onChange: (color: string) => void;
};

const ColorPicker: React.FC<Props> = ({ className, initialColor, onChange }) => {
  const [currentColor, setCurrentColor] = useState<string>(initialColor);

  const updateColor = useCallback((newColor: ColorResult) => setCurrentColor(newColor.hex), []);

  const submitColor = useCallback(
    (newColor: ColorResult) => {
      setCurrentColor(newColor.hex);
      onChange(newColor.hex);
    },
    [onChange]
  );

  return (
    <ChromePicker
      className={className}
      color={currentColor}
      onChange={updateColor}
      onChangeComplete={submitColor}
    />
  );
};

export { ColorPicker };
