import React, { useCallback } from 'react';
import { observer } from 'mobx-react-lite';
import { ChromePicker, ColorResult } from 'react-color';

import { Color } from 'stores';

type Props = {
  className?: string;
  color: Color;
};

const ColorPicker: React.FC<Props> = observer(({ className, color }) => {
  const updateColor = useCallback((newColor: ColorResult) => color.setValue(newColor.hex), [color]);

  return (
    <ChromePicker
      className={className}
      color={color.value}
      onChange={updateColor}
      onChangeComplete={updateColor}
    />
  );
});

export { ColorPicker };
