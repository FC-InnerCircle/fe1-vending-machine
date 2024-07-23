export class DisplayInfo {
  private template = `
      <div class="display"></div>  
  `;

  constructor(
    private $container: HTMLElement,
    private state: {
      totalAmount: number;
    }
  ) {}

  render() {
    this.$container.innerHTML = this.template;
    const display = this.$container.querySelector(
      ".display"
    )! as HTMLDivElement;
    display.textContent = `${this.state.totalAmount.toLocaleString()}원`;
  }

  setState(nextState: Partial<typeof this.state>) {
    this.state = { ...this.state, ...nextState };
    this.render();
  }
}
