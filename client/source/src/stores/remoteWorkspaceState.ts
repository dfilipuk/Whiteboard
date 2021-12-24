import { action, makeObservable, observable } from 'mobx';

enum ConnectionStatus {
  Connected = 'connected',
  Connecting = 'connecting',
  Disconnected = 'disconnected',
}

class RemoteWorkspaceState {
  status: ConnectionStatus;

  connectionRequested: number;

  constructor() {
    makeObservable(this, {
      status: observable,
      connectionRequested: observable,
      connect: action,
      setStatus: action,
    });
    this.connectionRequested = 1;
    this.status = ConnectionStatus.Disconnected;
  }

  connect() {
    this.connectionRequested++;
  }

  setStatus(value: ConnectionStatus) {
    this.status = value;
  }
}

export { ConnectionStatus, RemoteWorkspaceState };
