export class Store {
  _events = {};

  constructor(state) {
    this._state = state;
  }

  get state() {
    return this._state;
  }

  setState(state) {
    this._state = state;
  }

  on(event, listener) {
    if (!this._events[event]) this._events[event] = [];
    this._events[event].push(listener);
  }

  off(event, listener) {
    const idx = this._events[event].indexOf(listener);
    this._events[event].splice(idx, 1);
  }

  emit(event, ...args) {
    const listeners = this._events[event];
    if (Array.isArray(listeners)) {
      this._events[event].forEach((listener) => {
        listener.apply(this, args);
      });
    }
  }
}
