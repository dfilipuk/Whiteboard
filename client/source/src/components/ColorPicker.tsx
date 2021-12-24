import React, { useCallback, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { ChromePicker, ColorResult } from 'react-color';

import { Color } from 'stores';

type Props = {
  className?: string;
  color: Color;
};

const ColorPicker: React.FC<Props> = observer(({ className, color }) => {
  const [currentColor, setCurrentColor] = useState<string>(color.value);

  const updateColor = useCallback((newColor: ColorResult) => setCurrentColor(newColor.hex), []);

  const submitColor = useCallback(
    (newColor: ColorResult) => {
      color.setValue(newColor.hex);
      setCurrentColor(newColor.hex);
    },
    [color]
  );

  return (
    <ChromePicker
      className={className}
      color={currentColor}
      onChange={updateColor}
      onChangeComplete={submitColor}
    />
  );
});

export { ColorPicker };
