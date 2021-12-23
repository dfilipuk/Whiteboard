import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { DEFAULT_BACKGROUND_COLOR } from 'constants/drawing';
import { Line } from 'models';
import { MessageBus, WindowEventsProvider } from 'services';
import { Color } from 'stores';

import { WorkspaceDebug } from './WorkspaceDebug';

const App: React.FC = () => {
  const [color] = useState<Color>(new Color(DEFAULT_BACKGROUND_COLOR));
  const [busA] = useState<MessageBus<Line>>(new MessageBus<Line>(100, 100));
  const [busB] = useState<MessageBus<Line>>(new MessageBus<Line>(100, 100));

  return (
    <WindowEventsProvider>
      <BrowserRouter>
        <WorkspaceDebug backgroundColor={color} inputBus={busA} outputBus={busB} />
        <WorkspaceDebug backgroundColor={color} inputBus={busB} outputBus={busA} />
      </BrowserRouter>
    </WindowEventsProvider>
  );
};

export { App };
