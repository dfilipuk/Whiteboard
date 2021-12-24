import React, { useCallback, useEffect, useMemo } from 'react';
import { autorun } from 'mobx';
import * as signalR from '@microsoft/signalr';
import { MessagePackHubProtocol } from '@microsoft/signalr-protocol-msgpack';

import { SERVER_URL } from 'constants/server';
import { useRemoteWorkspaceStores } from 'hooks';
import { Line } from 'models';
import { MessageBus } from 'services';
import { Color, ConnectionStatus } from 'stores';

type Props = {
  backgroundColor: Color;
  inputBus: MessageBus<Line>;
  outputBus: MessageBus<Line>;
};

const RemoteWorkspace: React.FC<Props> = () => {
  const { remoteWorkspaceState } = useRemoteWorkspaceStores();

  const connection = useMemo(
    () =>
      // https://docs.microsoft.com/en-us/aspnet/core/signalr/security?view=aspnetcore-6.0
      new signalR.HubConnectionBuilder()
        .withUrl(`${SERVER_URL}/hub/draw`, { withCredentials: false })
        .withHubProtocol(new MessagePackHubProtocol())
        .withAutomaticReconnect()
        .build(),
    []
  );

  const startConnection = useCallback(async () => {
    try {
      remoteWorkspaceState.setStatus(ConnectionStatus.Connecting);
      await connection.start();
      remoteWorkspaceState.setStatus(ConnectionStatus.Connected);
    } catch {
      remoteWorkspaceState.setStatus(ConnectionStatus.Disconnected);
    }
  }, [connection, remoteWorkspaceState]);

  useEffect(() => {
    connection.onclose(() => remoteWorkspaceState.setStatus(ConnectionStatus.Disconnected));
    connection.onreconnected(() => remoteWorkspaceState.setStatus(ConnectionStatus.Connected));
    connection.onreconnecting(() => remoteWorkspaceState.setStatus(ConnectionStatus.Connecting));

    return () => {
      connection.stop();
    };
  });

  useEffect(() =>
    autorun(() => {
      if (remoteWorkspaceState.connectionRequested) {
        startConnection();
      }
    })
  );

  return <></>;
};

export { RemoteWorkspace };
