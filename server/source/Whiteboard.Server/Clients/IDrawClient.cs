using System.Threading.Tasks;

namespace Whiteboard.Server.Clients
{
    public interface IDrawClient
    {
        Task SetBackground(string color);
    }
}