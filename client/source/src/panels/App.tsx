import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { DEFAULT_BACKGROUND_COLOR } from 'constants/drawing';
import {
  CLIENT_TO_SERVER_DEBOUNCE,
  CLIENT_TO_SERVER_MAX_CHUNK_SIZE,
  SERVER_TO_CLIENT_DEBOUNCE,
  SERVER_TO_CLIENT_MAX_CHUNK_SIZE,
} from 'constants/server';
import { Line } from 'models';
import { MessageBus, RemoteWorkspace, WindowEventsProvider } from 'services';
import { Color } from 'stores';

import { WorkspaceDebug } from './WorkspaceDebug';

const App: React.FC = () => {
  const [color] = useState<Color>(new Color(DEFAULT_BACKGROUND_COLOR));

  const [clientToServerBus] = useState<MessageBus<Line>>(
    new MessageBus<Line>(CLIENT_TO_SERVER_DEBOUNCE, CLIENT_TO_SERVER_MAX_CHUNK_SIZE)
  );
  const [serverToClientBus] = useState<MessageBus<Line>>(
    new MessageBus<Line>(SERVER_TO_CLIENT_DEBOUNCE, SERVER_TO_CLIENT_MAX_CHUNK_SIZE)
  );

  return (
    <WindowEventsProvider>
      <BrowserRouter>
        <WorkspaceDebug
          backgroundColor={color}
          inputBus={serverToClientBus}
          outputBus={clientToServerBus}
        />
        <RemoteWorkspace
          backgroundColor={color}
          inputBus={clientToServerBus}
          outputBus={serverToClientBus}
        />
      </BrowserRouter>
    </WindowEventsProvider>
  );
};

export { App };
