import { Color } from './color';

class DrawingSettings {
  backgroundColor: Color;

  constructor(backgroundColor: Color) {
    this.backgroundColor = backgroundColor;
  }
}

export { DrawingSettings };
