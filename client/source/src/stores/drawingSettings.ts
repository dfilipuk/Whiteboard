import { Color } from './color';
import { Size } from './size';

class DrawingSettings {
  penSize: Size;

  penColor: Color;

  backgroundColor: Color;

  constructor(penSize: Size, penColor: Color, backgroundColor: Color) {
    this.penSize = penSize;
    this.penColor = penColor;
    this.backgroundColor = backgroundColor;
  }
}

export { DrawingSettings };
