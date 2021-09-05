import React from 'react';

import { WindowEventsProvider } from 'services';

import { Workspace } from './Workspace';

const App: React.FC = () => {
  return (
    <WindowEventsProvider>
      <Workspace />
    </WindowEventsProvider>
  );
};

export { App };
