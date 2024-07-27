import { Component } from "./component";

interface DisplayInfoState {
  totalAmount: number;
}

export class DisplayInfo extends Component<DisplayInfoState> {
  protected getTemplate(): string {
    return `
      <div class="display"></div>  
    `;
  }

  constructor(
    protected $container: HTMLElement,
    protected state: DisplayInfoState
  ) {
    super($container, state);
  }

  render() {
    this.$container.innerHTML = this.getTemplate();
    const display = this.$container.querySelector(".display") as HTMLDivElement;
    if (display) {
      display.textContent = `${this.state.totalAmount.toLocaleString()}원`;
    }
  }
}
