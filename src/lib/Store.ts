type Listener<T> = (state: T) => void;

export default class Store<T> {
  private state: T;
  private listeners: Set<Listener<T>> = new Set();

  constructor(initialState: T) {
    this.state = initialState;
  }

  subscribe(listener: Listener<T>) {
    this.listeners.add(listener);
  }

  unsubscribe(listener: Listener<T>) {
    this.listeners.delete(listener);
  }

  setState(newState: Partial<T>) {
    this.state = { ...this.state, ...newState };
    this.listeners.forEach((listener) => listener(this.state));
  }

  getState(): T {
    return this.state;
  }
}
