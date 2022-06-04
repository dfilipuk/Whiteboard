import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { autorun } from 'mobx';
import * as signalR from '@microsoft/signalr';
import { MessagePackHubProtocol } from '@microsoft/signalr-protocol-msgpack';

import { SERVER_URL } from 'constants/server';
import { useRemoteWorkspaceStores } from 'hooks';
import { Line } from 'models';
import { MessageBus } from 'services';
import { Color, ConnectionStatus } from 'stores';

const DEBUG_MESSAGE_PREFIX = 'RemoteWorkspace:';

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

  const draw = useCallback(
    (figures: Line[]) => {
      console.debug(DEBUG_MESSAGE_PREFIX, 'draw');
      outputBus.publishChunk(figures);
    },
    [outputBus]
  );

  const setBackground = useCallback(
    (color: string, version: number) => {
      console.debug(
        DEBUG_MESSAGE_PREFIX,
        'setBackground:',
        `color: ${color};`,
        `server version: ${version};`,
        `local version: ${backgroundColorVersion.current}`
      );

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
        console.debug(DEBUG_MESSAGE_PREFIX, 'drawOnRemote');
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

        console.debug(
          DEBUG_MESSAGE_PREFIX,
          'setBackgroundOnRemote:',
          `color: ${color};`,
          `server version: ${newVersion};`,
          `local version before server response: ${versionBeforeCall}`,
          `local version after server response: ${backgroundColorVersion.current}`
        );

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

  const onConnect = useCallback(() => {
    console.debug(DEBUG_MESSAGE_PREFIX, 'onConnect');
    inputBus.subscribe(drawOnRemote);
  }, [inputBus, drawOnRemote]);

  const onDisconnect = useCallback(() => {
    console.debug(DEBUG_MESSAGE_PREFIX, 'onDisconnect');
    inputBus.unsubscribe();
    backgroundColorVersion.current = 0;
    backgroundColorOnRemote.current = null;
  }, [inputBus]);

  const connect = useCallback(async () => {
    try {
      console.debug(DEBUG_MESSAGE_PREFIX, 'start connection');
      remoteWorkspaceState.setStatus(ConnectionStatus.Connecting);
      await connection.start();
      onConnect();
      remoteWorkspaceState.setStatus(ConnectionStatus.Connected);
    } catch {
      remoteWorkspaceState.setStatus(ConnectionStatus.Disconnected);
    }
  }, [connection, remoteWorkspaceState, onConnect]);

  useEffect(() => {
    console.debug(DEBUG_MESSAGE_PREFIX, 'initialize connection');

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

    connection.on('Draw', draw);
    connection.on('SetBackground', setBackground);

    return () => {
      console.debug(DEBUG_MESSAGE_PREFIX, 'stop connection');
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
