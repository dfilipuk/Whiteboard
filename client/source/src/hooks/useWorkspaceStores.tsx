import React, { createContext, useContext, useState } from 'react';

import { DEFAULT_PEN_COLOR, DEFAULT_PEN_SIZE } from 'constants/drawing';
import { Color, DrawingSettings, FocusTarget, Size, WorkspaceState } from 'stores';

type WorkspaceStoresContext = {
  workspaceState: WorkspaceState;
  drawingSettings: DrawingSettings;
};

const workspaceStoresContext = createContext<WorkspaceStoresContext | undefined>(undefined);

const useWorkspaceStores = (): WorkspaceStoresContext => {
  const context = useContext(workspaceStoresContext);

  if (context === undefined) {
    throw new Error('useWorkspaceStores must be used with a WorkspaceStores provider');
  }

  return context;
};

type Props = {
  backgroundColor: Color;
  initialPenSize?: number;
  initialPenColor?: string;
};

const WorkspaceStoresProvider: React.FC<Props> = (props) => {
  const { children, backgroundColor, initialPenSize, initialPenColor } = props;

  const [drawingSettings] = useState<DrawingSettings>(
    new DrawingSettings(
      new Size(initialPenSize ?? DEFAULT_PEN_SIZE),
      new Color(initialPenColor ?? DEFAULT_PEN_COLOR),
      backgroundColor
    )
  );
  const [workspaceState] = useState<WorkspaceState>(
    new WorkspaceState(FocusTarget.Whiteboard, null)
  );

  const value: WorkspaceStoresContext = {
    workspaceState,
    drawingSettings,
  };

  return (
    <workspaceStoresContext.Provider value={value}>{children}</workspaceStoresContext.Provider>
  );
};

export { useWorkspaceStores, WorkspaceStoresProvider };
