import { action, makeObservable, observable } from 'mobx';

class Size {
  value: number;

  constructor(value: number) {
    makeObservable(this, {
      value: observable,
      setValue: action,
    });
    this.value = value;
  }

  setValue(value: number) {
    this.value = value;
  }
}

export { Size };
