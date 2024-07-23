export class DisplayInfo {
  private getTemplate(): string {
    return `
      <div class="display"></div>  
    `;
  }

  constructor(
    private $container: HTMLElement,
    private state: {
      totalAmount: number;
    }
  ) {
    this.initialize();
  }

  private initialize() {
    this.render();
  }

  render() {
    this.$container.innerHTML = this.getTemplate();
    const display = this.$container.querySelector(".display") as HTMLDivElement;
    if (display) {
      display.textContent = `${this.state.totalAmount.toLocaleString()}원`;
    }
  }

  setState(nextState: Partial<typeof this.state>) {
    this.state = { ...this.state, ...nextState };
    this.render();
  }
}
