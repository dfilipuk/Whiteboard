import React, { useCallback } from 'react';
import { observer } from 'mobx-react-lite';

import { Button } from 'components';
import { useRemoteWorkspaceStores } from 'hooks';
import { ConnectionStatus } from 'stores';

const COLOR: { [key in ConnectionStatus]: string } = {
  connected: 'green',
  connecting: 'black',
  disconnected: 'red',
};

const ICON: { [key in ConnectionStatus]: string } = {
  connected: 'las la-server',
  connecting: 'las la-spinner',
  disconnected: 'las la-server',
};

type Props = {
  className?: string;
};

const ServerStatus: React.FC<Props> = observer(({ className }) => {
  const { remoteWorkspaceState } = useRemoteWorkspaceStores();

  const canConnect = remoteWorkspaceState.status === ConnectionStatus.Disconnected;

  const connect = useCallback(() => remoteWorkspaceState.connect(), [remoteWorkspaceState]);

  return (
    <Button
      className={className}
      icon={ICON[remoteWorkspaceState.status]}
      color={COLOR[remoteWorkspaceState.status]}
      onClick={canConnect ? connect : undefined}
    />
  );
});

export { ServerStatus };
