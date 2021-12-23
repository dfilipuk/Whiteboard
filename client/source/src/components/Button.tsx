import React from 'react';
import { observer } from 'mobx-react-lite';
import styled from 'styled-components';

import { Color } from 'stores';

const Element = styled.i`
  cursor: pointer;
  background-color: #dadada;
  border-radius: 0.2em;
`;

type Props = {
  className?: string;
  icon: string;
  color: Color;
  onClick?: () => void;
};

const Button: React.FC<Props> = observer(({ className, icon, color, onClick }) => {
  return (
    <Element className={`${className} ${icon}`} style={{ color: color.value }} onClick={onClick} />
  );
});

export { Button };
