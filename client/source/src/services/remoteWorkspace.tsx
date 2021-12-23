import React from 'react';

import { Line } from 'models';
import { MessageBus } from 'services';
import { Color } from 'stores';

type Props = {
  backgroundColor: Color;
  inputBus: MessageBus<Line>;
  outputBus: MessageBus<Line>;
};

const RemoteWorkspace: React.FC<Props> = () => {
  return <></>;
};

export { RemoteWorkspace };
