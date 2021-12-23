import React, { createContext, useContext } from 'react';
import { DrawingSettings, WorkspaceState } from 'stores';

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

const WorkspaceStoresProvider: React.FC<WorkspaceStoresContext> = (props) => {
  const { children, workspaceState, drawingSettings } = props;

  const value: WorkspaceStoresContext = {
    workspaceState,
    drawingSettings,
  };

  return (
    <workspaceStoresContext.Provider value={value}>{children}</workspaceStoresContext.Provider>
  );
};

export { useWorkspaceStores, WorkspaceStoresProvider };
