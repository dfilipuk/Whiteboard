import { action, makeObservable, observable } from 'mobx';

enum ConnectionStatus {
  Connected,
  Connecting,
  Disconnected,
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
    this.connectionRequested = 0;
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
