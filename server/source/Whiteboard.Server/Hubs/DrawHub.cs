using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using Whiteboard.Server.Clients;
using Whiteboard.Server.Models;

namespace Whiteboard.Server.Hubs
{
    public class DrawHub : Hub<IDrawClient>
    {
        public async Task Draw(Line[] figures)
        {
            await Clients.Others.Draw(figures);
        }

        public async Task SetBackground(string color)
        {
            await Clients.Others.SetBackground(color);
        }
    }
}