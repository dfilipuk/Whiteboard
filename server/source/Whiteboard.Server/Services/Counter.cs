using System.Threading;

namespace Whiteboard.Server.Services
{
    public class Counter : ICounter
    {
        private ulong _counter = 0;

        public ulong Next()
        {
            return Interlocked.Increment(ref _counter);
        }
    }
}