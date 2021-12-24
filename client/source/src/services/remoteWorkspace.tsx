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

const RemoteWorkspace: React.FC<Props> = ({ backgroundColor, inputBus, outputBus }) => {
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

  const draw = useCallback(
    async (figures: Line[]) => {
      try {
        await connection.invoke('Draw', figures);
      } catch {}
    },
    [connection]
  );

  const setBackground = useCallback(
    async (color: string) => {
      try {
        await connection.invoke('SetBackground', color);
      } catch {}
    },
    [connection]
  );

  const startConnection = useCallback(async () => {
    try {
      remoteWorkspaceState.setStatus(ConnectionStatus.Connecting);
      await connection.start();
      inputBus.subscribe(draw);
      remoteWorkspaceState.setStatus(ConnectionStatus.Connected);
    } catch {
      remoteWorkspaceState.setStatus(ConnectionStatus.Disconnected);
    }
  }, [connection, remoteWorkspaceState, draw, inputBus]);

  useEffect(() => {
    connection.onclose(() => {
      inputBus.unsubscribe();
      remoteWorkspaceState.setStatus(ConnectionStatus.Disconnected);
    });
    connection.onreconnected(() => {
      inputBus.subscribe(draw);
      remoteWorkspaceState.setStatus(ConnectionStatus.Connected);
    });
    connection.onreconnecting(() => {
      inputBus.unsubscribe();
      remoteWorkspaceState.setStatus(ConnectionStatus.Connecting);
    });

    connection.on('Draw', (figures: Line[]) => outputBus.publishChunk(figures));
    connection.on('SetBackground', (color: string) => backgroundColor.setValue(color));

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

  useEffect(() =>
    autorun(() => {
      const color = backgroundColor.value;
      if (connection.state === signalR.HubConnectionState.Connected) {
        setBackground(color);
      }
    })
  );

  return <></>;
};

export { RemoteWorkspace };
