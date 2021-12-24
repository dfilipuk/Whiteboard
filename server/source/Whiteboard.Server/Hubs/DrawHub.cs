using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using Whiteboard.Server.Clients;
using Whiteboard.Server.Models;
using Whiteboard.Server.Services;

namespace Whiteboard.Server.Hubs
{
    public class DrawHub : Hub<IDrawClient>
    {
        private readonly ICounter _counter;

        public DrawHub(ICounter counter)
        {
            _counter = counter;
        }

        public async Task Draw(Line[] figures)
        {
            await Clients.Others.Draw(figures);
        }

        public async Task<ulong> SetBackground(string color)
        {
            ulong version = _counter.Next();
            await Clients.Others.SetBackground(color, version);
            return version;
        }
    }
}