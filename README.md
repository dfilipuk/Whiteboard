# Whiteboard

Online multi-user whiteboard. Multiple users can draw together on the same whiteboard in real time.

## Technical details

Client-server architecture. Each client sends to server all its drawing actions. Server broadcasts drawing actions to all other clients in its turn. Each client also accepts and applies to its whiteboard all drawing actions received from the server.

Client is built using `React` and `MobX`. Server is built using `.NET`. `SignalR` is used for real-time communication between clients and server. `SignalR` configured to use `WebSocket` as transport (with fallback to `Server-Sent Events` or `Long Polling` when `WebSocket` is not available) and `MessagePack` as data transfer protocol.

## Build and run

### VSCode devcontainers

[VSCode devcontainers](https://code.visualstudio.com/docs/remote/containers) are configured for client and server for local development. You can build, run, debug client and server using devcontainer.

### Docker

Use `docker-compose up` to build and run release version of the client and server.

### URLs

- Client -- http://localhost:3000
- Server -- http://localhost:5000

### Tips

- Client uses `localhost` by default to access server. You can change it by setting server URL in `./client/source/src/constants/server.ts:SERVER_URL`
- Initial drawing setting can be specified in query params for debug and testing purposes. For example `?color=blue&bgcolor=lime&size=15`
  - `size` -- pen size
  - `color` -- pen color
  - `bgcolor` -- background color

![Whiteboard demo](./Whiteboard.GIF)