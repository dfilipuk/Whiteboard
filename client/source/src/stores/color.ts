import { action, makeObservable, observable } from 'mobx';

class Color {
  value: string;

  constructor(value: string) {
    makeObservable(this, {
      value: observable,
      setValue: action,
    });
    this.value = value;
  }

  setValue(value: string) {
    this.value = value;
  }
}

export { Color };
