using System.Threading;

namespace Whiteboard.Server.Services
{
    public class Counter : ICounter
    {
        private int _counter = 0;

        public int Next()
        {
            return Interlocked.Increment(ref _counter);
        }
    }
}