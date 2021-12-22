import React, { useState } from 'react';

import { DEFAULT_BACKGROUND_COLOR } from 'constants/drawing';
import { WindowEventsProvider } from 'services';
import { Color } from 'stores';

import { Workspace } from './Workspace';

const App: React.FC = () => {
  const [color] = useState<Color>(new Color(DEFAULT_BACKGROUND_COLOR));

  return (
    <WindowEventsProvider>
      <Workspace backgroundColor={color} />
    </WindowEventsProvider>
  );
};

export { App };
