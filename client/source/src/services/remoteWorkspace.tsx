import React, { useCallback, useEffect, useMemo, useRef } from 'react';
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

const RemoteWorkspace: React.FC<Props> = React.memo(({ backgroundColor, inputBus, outputBus }) => {
  const { remoteWorkspaceState } = useRemoteWorkspaceStores();

  const backgroundColorVersion = useRef<number>(0);
  const backgroundColorOnRemote = useRef<string | null>(null);

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

  const setBackground = useCallback(
    (color: string, version: number) => {
      if (version > backgroundColorVersion.current) {
        backgroundColorOnRemote.current = color;
        backgroundColorVersion.current = version;
        backgroundColor.setValue(color);
      }
    },
    [backgroundColor]
  );

  const drawOnRemote = useCallback(
    async (figures: Line[]) => {
      try {
        await connection.invoke('Draw', figures);
      } catch {}
    },
    [connection]
  );

  const setBackgroundOnRemote = useCallback(
    async (color: string) => {
      try {
        const versionBeforeCall = backgroundColorVersion.current;
        const newVersion = await connection.invoke<number>('SetBackground', color);

        if (backgroundColorVersion.current !== versionBeforeCall) {
          setBackground(color, newVersion);
        } else {
          backgroundColorOnRemote.current = color;
          backgroundColorVersion.current = newVersion;
        }
      } catch {}
    },
    [connection, setBackground]
  );

  const onConnect = useCallback(() => inputBus.subscribe(drawOnRemote), [inputBus, drawOnRemote]);

  const onDisconnect = useCallback(() => {
    inputBus.unsubscribe();
    backgroundColorVersion.current = 0;
    backgroundColorOnRemote.current = null;
  }, [inputBus]);

  const connect = useCallback(async () => {
    try {
      remoteWorkspaceState.setStatus(ConnectionStatus.Connecting);
      await connection.start();
      onConnect();
      remoteWorkspaceState.setStatus(ConnectionStatus.Connected);
    } catch {
      remoteWorkspaceState.setStatus(ConnectionStatus.Disconnected);
    }
  }, [connection, remoteWorkspaceState, onConnect]);

  useEffect(() => {
    connection.onclose(() => {
      onDisconnect();
      remoteWorkspaceState.setStatus(ConnectionStatus.Disconnected);
    });
    connection.onreconnected(() => {
      onConnect();
      remoteWorkspaceState.setStatus(ConnectionStatus.Connected);
    });
    connection.onreconnecting(() => {
      onDisconnect();
      remoteWorkspaceState.setStatus(ConnectionStatus.Connecting);
    });

    connection.on('Draw', (figures: Line[]) => outputBus.publishChunk(figures));
    connection.on('SetBackground', setBackground);

    return () => {
      connection.stop();
    };
  });

  useEffect(() =>
    autorun(() => {
      if (remoteWorkspaceState.connectionRequested) {
        connect();
      }
    })
  );

  useEffect(() =>
    autorun(() => {
      const color = backgroundColor.value;
      if (
        color !== backgroundColorOnRemote.current &&
        connection.state === signalR.HubConnectionState.Connected
      ) {
        setBackgroundOnRemote(color);
      }
    })
  );

  return <></>;
});

export { RemoteWorkspace };
