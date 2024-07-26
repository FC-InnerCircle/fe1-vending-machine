import Component from "../core/component.ts";

interface Props {
  onDeposit?: (value: number) => void;
  onWithdraw?: (value: number) => void;
}

export default class Amount extends Component<Props> {
  template() {
    return `
      <input type="number" class="amount__input" step="1">
      <button type="button" class="amount__deposit-button">투입</button>
      <button type="button" class="amount__withdraw-button">반환</button>
    `;
  }

  protected setEvent() {
    this.addEvent('input', '.amount__input', (e) => {
      const input = e.target as HTMLInputElement;

      const value = Math.floor(Number(input.value));

      if (this.isPositiveNumber(value)) {
        input.value = value.toString();
        return;
      }

      input.value = '';
    });

    this.addEvent('click', '.amount__deposit-button', () => {
      this.handleClick(this.props.onDeposit);
    });

    this.addEvent('click', '.amount__withdraw-button', () => {
      this.handleClick(this.props.onWithdraw);
    });
  }

  private isPositiveNumber(value: number) {
    return !isNaN(value) && value > 0;
  }

  private handleClick(handler?: (value: number) => void) {
    const input = this.target.querySelector('.amount__input') as HTMLInputElement;
    handler?.(Number(input.value));
  }
}
