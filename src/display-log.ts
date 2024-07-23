export class DisplayLog {
  private getTemplate(): string {
    return `
      <div class="logs"></div>  
    `;
  }

  constructor(
    private $container: HTMLElement,
    private state: {
      logs: string[];
    }
  ) {
    this.initialize();
  }

  private initialize() {
    this.render();
  }

  render() {
    this.$container.innerHTML = this.getTemplate();
    const logs = this.$container.querySelector(".logs") as HTMLDivElement;
    if (logs) {
      logs.innerHTML = this.state.logs
        .map((log) => `<div>${log}</div>`)
        .join("");
    }
    this.scrollToBottom();
  }

  setState(nextState: Partial<typeof this.state>) {
    this.state = { ...this.state, ...nextState };
    this.render();
  }

  private scrollToBottom() {
    this.$container.scrollTop = this.$container.scrollHeight;
  }
}
