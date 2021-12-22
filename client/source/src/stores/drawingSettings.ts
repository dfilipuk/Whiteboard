import { Color } from './color';

class DrawingSettings {
  penColor: Color;

  backgroundColor: Color;

  constructor(penColor: Color, backgroundColor: Color) {
    this.penColor = penColor;
    this.backgroundColor = backgroundColor;
  }
}

export { DrawingSettings };
