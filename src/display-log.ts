import { Component } from "./component";

export class DisplayLog extends Component<{ logs: string[] }> {
  protected getTemplate(): string {
    return `
      <div class="logs"></div>  
    `;
  }

  constructor(
    protected $container: HTMLElement,
    protected state: { logs: string[] }
  ) {
    super($container, state);
  }

  render() {
    this.$container.innerHTML = this.getTemplate();
    const logs = this.$container.querySelector(".logs") as HTMLDivElement;
    if (logs) {
      logs.innerHTML = this.state.logs
        .map((log) => `<div role="log">${log}</div>`)
        .join("");
    }
    this.scrollToBottom();
  }

  private scrollToBottom() {
    this.$container.scrollTop = this.$container.scrollHeight;
  }
}
