import React from 'react';
import styled from 'styled-components';

import { Sidebar } from './Sidebar';
import { Whiteboard } from './Whiteboard';

const Container = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
`;

const Workspace: React.FC = () => {
  return (
    <Container>
      <Sidebar />
      <Whiteboard />
    </Container>
  );
};

export { Workspace };
