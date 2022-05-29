# Whiteboard

Online multi-user whiteboard. Multiple users can draw together on the same whiteboard in real time.

![Whiteboard demo](./Whiteboard.GIF)

## Technical details

Client-server architecture. Each client sends to server all its drawing actions. Server broadcasts drawing actions to all other clients in its turn. Each client also accepts and applies to its whiteboard all drawing actions received from the server.

Client is built using `React` and `MobX`. Server is built using `.NET`. `SignalR` is used for real-time communication between clients and server. `SignalR` configured to use `WebSocket` as transport and `MessagePack` as data transfer protocol. `Server-Sent Events` and `Long Polling` are fallback options when `WebSocket` is not available.

## Build and run

### VSCode devcontainers

[VSCode devcontainers](https://code.visualstudio.com/docs/remote/containers) are configured for client and server for local development. You can build, run, debug client and server using devcontainer.

#### Client

- Open `client` folder as devcontainer in VSCode
- Launch terminal and execute `cd source && yarn start`

#### Server

- Open `server` folder as devcontainer in VSCode
- Open `Run and Debug` tab in VSCode
- Select and start `.NET Core Launch (web)`

### Docker

Use `docker-compose up` to build and run release version of the client and server.

### URLs

- Client -- http://localhost:3000
- Server -- http://localhost:5000

### Tips

- Client uses `localhost` by default to access server. You can change it by setting server URL in `./client/source/src/constants/server.ts:SERVER_URL`
- Initial drawing setting can be specified in query params. For example `?color=blue&bgcolor=lime&size=15`
  - `size` -- pen size
  - `color` -- pen color
  - `bgcolor` -- background color