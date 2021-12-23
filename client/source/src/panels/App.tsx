import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { DEFAULT_BACKGROUND_COLOR } from 'constants/drawing';
import { WindowEventsProvider } from 'services';
import { Color } from 'stores';

import { WorkspaceDebug } from './WorkspaceDebug';

const App: React.FC = () => {
  const [color] = useState<Color>(new Color(DEFAULT_BACKGROUND_COLOR));

  return (
    <WindowEventsProvider>
      <BrowserRouter>
        <WorkspaceDebug backgroundColor={color} />
      </BrowserRouter>
    </WindowEventsProvider>
  );
};

export { App };
