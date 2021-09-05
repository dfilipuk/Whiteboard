import React from 'react';

import { WindowEventsProvider } from 'utils';

import { Workspace } from './Workspace';

const App: React.FC = () => {
  return (
    <WindowEventsProvider>
      <Workspace />
    </WindowEventsProvider>
  );
};

export { App };
