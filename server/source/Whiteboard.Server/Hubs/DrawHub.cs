using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using Whiteboard.Server.Clients;

namespace Whiteboard.Server.Hubs
{
    public class DrawHub : Hub<IDrawClient>
    {
        public async Task SetBackground(string color)
        {
            await Clients.Others.SetBackground(color);
        }
    }
}