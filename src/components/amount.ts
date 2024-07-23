import Component from "../core/component.ts";

interface Props {
  onDeposit?: (value: number) => void;
  onWithdraw?: (value: number) => void;
}

export default class Amount extends Component<Props> {
  template () {
    return `
      <input type="number" class="amount__input" value="0">
      <button type="button" class="amount__deposit-button">투입</button>
      <button type="button" class="amount__withdraw-button">반환</button>
    `;
  }

  protected setEvent() {
    const handleClick = (handler?: (value: number) => void) => {
      const input = this.target.querySelector('.amount__input') as HTMLInputElement;
      handler?.(Number(input.value));
    }

    this.addEvent('click', '.amount__deposit-button', () => {
      handleClick(this.props.onDeposit?.bind(this));
    });

    this.addEvent('click', '.amount__withdraw-button', () => {
      handleClick(this.props.onWithdraw?.bind(this));
    });
  }
}
