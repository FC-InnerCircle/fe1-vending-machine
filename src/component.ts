export abstract class Component<T = {}, H = {}> {
  protected abstract getTemplate(): string;
  private cleanupEvent: () => void = () => {};

  constructor(
    protected $container: HTMLElement,
    protected state: T,
    protected handlers?: H
  ) {
    this.handlers = handlers;
    this.state = state;
    this.initialize();
  }

  protected initialize() {
    this.render();
  }

  render() {
    this.cleanupEvent();
    this.$container.innerHTML = this.getTemplate();
    this.onRender?.();
    this.cleanupEvent = this.setUpEvent?.() ?? (() => {});
  }

  setState(nextState: Partial<T>) {
    this.state = { ...this.state, ...nextState };
    this.render();
  }

  protected onRender?(): void;

  protected setUpEvent?(): () => void;
}
