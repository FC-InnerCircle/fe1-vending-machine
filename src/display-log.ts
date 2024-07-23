export class DisplayLog {
  private template = `
      <div class="logs"></div>  
  `;

  constructor(
    private $container: HTMLElement,
    private state: {
      logs: string[];
    }
  ) {}

  render() {
    this.$container.innerHTML = this.template;
    const logs = this.$container.querySelector(".logs")! as HTMLDivElement;
    logs.innerHTML = this.state.logs.map((log) => `<div>${log}</div>`).join("");
  }

  setState(nextState: Partial<typeof this.state>) {
    this.state = { ...this.state, ...nextState };
    this.render();
  }
}
