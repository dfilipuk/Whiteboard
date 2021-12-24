using Microsoft.AspNetCore.SignalR;
using Whiteboard.Server.Clients;

namespace Whiteboard.Server.Hubs
{
    public class DrawHub : Hub<IDrawClient>
    {

    }
}