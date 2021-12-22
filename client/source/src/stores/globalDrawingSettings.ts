import { Color } from './color';

class GlobalDrawingSettings {
  backgroundColor: Color;

  constructor(backgroundColor: string) {
    this.backgroundColor = new Color(backgroundColor);
  }
}

export { GlobalDrawingSettings };
