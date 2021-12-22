import React, { useState } from 'react';

import { WindowEventsProvider } from 'services';
import { GlobalDrawingSettings } from 'stores';

import { Workspace } from './Workspace';

const App: React.FC = () => {
  const [globalDrawingSettings] = useState<GlobalDrawingSettings>(
    () => new GlobalDrawingSettings('white')
  );

  return (
    <WindowEventsProvider>
      <Workspace settings={globalDrawingSettings} />
    </WindowEventsProvider>
  );
};

export { App };
