import React from 'react';
import styled from 'styled-components';

const Element = styled.i<{ clickable: boolean }>`
  cursor: ${(props) => (props.clickable ? 'pointer' : 'auto')};
  background-color: #dadada;
  border-radius: 0.2em;
`;

type Props = {
  className?: string;
  icon: string;
  color: string;
  onClick?: () => void;
};

const Button: React.FC<Props> = ({ className, icon, color, onClick }) => {
  return (
    <Element
      style={{ color }}
      onClick={onClick}
      clickable={onClick !== undefined}
      className={`${className} ${icon}`}
    />
  );
};

export { Button };
