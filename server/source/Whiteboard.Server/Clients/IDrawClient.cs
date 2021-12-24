using System.Threading.Tasks;
using Whiteboard.Server.Models;

namespace Whiteboard.Server.Clients
{
    public interface IDrawClient
    {
        Task Draw(Line[] figures);
        Task SetBackground(string color, ulong version);
    }
}