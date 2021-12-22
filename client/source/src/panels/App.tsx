import React, { useState } from 'react';

import { WindowEventsProvider } from 'services';
import { Color } from 'stores';

import { Workspace } from './Workspace';

const App: React.FC = () => {
  const [color] = useState<Color>(new Color('white'));

  return (
    <WindowEventsProvider>
      <Workspace backgroundColor={color} />
    </WindowEventsProvider>
  );
};

export { App };
