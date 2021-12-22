import React from 'react';
import styled from 'styled-components';

import { GlobalDrawingSettings } from 'stores';

import { Sidebar } from './Sidebar';
import { Whiteboard } from './Whiteboard';

const Container = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
`;

type Props = {
  settings: GlobalDrawingSettings;
};

const Workspace: React.FC<Props> = ({ settings }) => {
  return (
    <Container>
      <Sidebar settings={settings} />
      <Whiteboard settings={settings} />
    </Container>
  );
};

export { Workspace };
