import React, { createContext, useContext, useState } from 'react';

import { RemoteWorkspaceState } from 'stores/remoteWorkspaceState';

type RemoteWorkspaceStoresContext = {
  remoteWorkspaceState: RemoteWorkspaceState;
};

const remoteWorkspaceStoresContext = createContext<RemoteWorkspaceStoresContext | undefined>(
  undefined
);

const useRemoteWorkspaceStores = (): RemoteWorkspaceStoresContext => {
  const context = useContext(remoteWorkspaceStoresContext);

  if (context === undefined) {
    throw new Error('useRemoteWorkspaceStores must be used with a RemoteWorkspaceStores provider');
  }

  return context;
};

const RemoteWorkspaceStoresProvider: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const [remoteWorkspaceState] = useState<RemoteWorkspaceState>(new RemoteWorkspaceState());

  const value: RemoteWorkspaceStoresContext = {
    remoteWorkspaceState,
  };

  return (
    <remoteWorkspaceStoresContext.Provider value={value}>
      {children}
    </remoteWorkspaceStoresContext.Provider>
  );
};

export { useRemoteWorkspaceStores, RemoteWorkspaceStoresProvider };
