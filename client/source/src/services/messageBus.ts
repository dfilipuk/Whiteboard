import { action, makeObservable, observable } from 'mobx';
import { chunkProcessor, IDisposer } from 'mobx-utils';

class MessageBus<T> {
  private debounce?: number;

  private maxChunkSize?: number;

  private disposer?: IDisposer;

  items: T[];

  constructor(debounce?: number, maxChunkSize?: number) {
    // eslint-disable-next-line mobx/exhaustive-make-observable
    makeObservable(this, {
      items: observable,
      publish: action,
    });
    this.items = [];
    this.debounce = debounce;
    this.maxChunkSize = maxChunkSize;
  }

  publish(item: T) {
    this.items.push(item);
  }

  subscribe(processor: (items: T[]) => void) {
    this.disposer = chunkProcessor(this.items, processor, this.debounce, this.maxChunkSize);
  }

  unsubscribe() {
    if (this.disposer) {
      this.disposer();
      this.disposer = undefined;
    }
  }
}

export { MessageBus };
