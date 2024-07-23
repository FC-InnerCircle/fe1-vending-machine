export default abstract class Component<Props = {}, State = {}> {
  protected readonly target: HTMLElement;
  protected readonly props: Props;
  protected state: State;

  constructor(target: HTMLElement, props: Props) {
    this.target = target;
    this.props = props;
    this.state = this.initializeState();
    this.setEvent();
    this.render();
  }

  protected initializeState(): State {
    return {} as State;
  }

  protected mounted() {};

  protected template() { return ''; }

  private render() {
    this.target.innerHTML = this.template();
    this.mounted();
  }

  protected setEvent() {}

  protected setState(newState: Partial<State>) {
    this.state = { ...this.state, ...newState };
    this.render();
  }

  protected addEvent<K extends keyof HTMLElementEventMap>(eventType: K, selector: string, callback: (e: HTMLElementEventMap[K]) => void) {
    this.target.addEventListener<K>(eventType, event => {
      if (!(event.target as Element).closest(selector)) return;
      callback(event);
    })
  }
}