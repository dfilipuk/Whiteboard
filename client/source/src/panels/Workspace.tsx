import React, { useState } from 'react';
import styled from 'styled-components';

import { DEFAULT_PEN_COLOR, DEFAULT_PEN_SIZE } from 'constants/drawing';
import { WorkspaceStoresProvider } from 'hooks';
import { Line } from 'models';
import { MessageBus } from 'services';
import { Color, DrawingSettings, FocusTarget, Size, WorkspaceState } from 'stores';

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

const Workspace: React.FC<Props> = ({
  backgroundColor,
  initialPenSize,
  initialPenColor,
  inputBus,
  outputBus,
}) => {
  const [settings] = useState<DrawingSettings>(
    new DrawingSettings(
      new Size(initialPenSize ?? DEFAULT_PEN_SIZE),
      new Color(initialPenColor ?? DEFAULT_PEN_COLOR),
      backgroundColor
    )
  );
  const [state] = useState<WorkspaceState>(new WorkspaceState(FocusTarget.Whiteboard, null));

  return (
    <WorkspaceStoresProvider drawingSettings={settings} workspaceState={state}>
      <Container>
        <Sidebar />
        <Whiteboard inputBus={inputBus} outputBus={outputBus} />
      </Container>
    </WorkspaceStoresProvider>
  );
};

export { Workspace };
