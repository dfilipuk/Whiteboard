import { Point } from './point';

class Line {
  from: Point;

  to: Point;

  width: number;

  color: string;

  constructor(from: Point, to: Point, width: number, color: string) {
    this.to = to;
    this.from = from;
    this.width = width;
    this.color = color;
  }
}

export { Line };
