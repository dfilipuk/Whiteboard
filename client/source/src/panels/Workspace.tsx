import React from 'react';
import styled from 'styled-components';

import { WorkspaceStoresProvider } from 'hooks';
import { Line } from 'models';
import { MessageBus } from 'services';
import { Color } from 'stores';

import { Sidebar } from './Sidebar';
import { Whiteboard } from './Whiteboard';

const Container = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
`;

type Props = {
  backgroundColor: Color;
  initialPenSize?: number;
  initialPenColor?: string;
  inputBus: MessageBus<Line>;
  outputBus: MessageBus<Line>;
};

const Workspace: React.FC<Props> = React.memo((props) => {
  const { backgroundColor, initialPenSize, initialPenColor, inputBus, outputBus } = props;

  return (
    <WorkspaceStoresProvider
      initialPenSize={initialPenSize}
      initialPenColor={initialPenColor}
      backgroundColor={backgroundColor}
    >
      <Container>
        <Sidebar />
        <Whiteboard inputBus={inputBus} outputBus={outputBus} />
      </Container>
    </WorkspaceStoresProvider>
  );
});

export { Workspace };
