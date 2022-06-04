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
  initialSize: number;
  minSize: number;
  maxSize: number;
  onChange: (size: number) => void;
};

const SizePicker: React.FC<Props> = React.memo((props) => {
  const { className, initialSize, minSize, maxSize, onChange } = props;

  const onValueChange = useCallback(
    (value: number | number[]) => {
      if (Array.isArray(value)) {
        onChange(value[value.length - 1]);
      } else {
        onChange(value);
      }
    },
    [onChange]
  );

  return (
    <Container className={className}>
      <Slider min={minSize} max={maxSize} defaultValue={initialSize} onChange={onValueChange} />
    </Container>
  );
});

export { SizePicker };
