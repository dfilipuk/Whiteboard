namespace Whiteboard.Server.Models;

public class Line
{
    public Point To { get; set; }
    public Point From { get; set; }
    public double Width { get; set; }
    public string Color { get; set; }
}
