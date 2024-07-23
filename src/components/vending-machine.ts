import Component from "../core/component.ts";

interface Props {
  balance: number;
  onPurchase?: (price: number) => void;
}

const prices = Array.from({ length: 9 })
  .map((_, i) => (i + 3) * 100);

export default class VendingMachine extends Component<Props> {
  template () {
    const {balance} = this.props;

    return `
      <div class="vending-machine__balance">${balance}</div>
      <div class="vending-machine__purchase-container">
        ${prices
          .map(price => `<button type="button" class="vending-machine__purchase-button" data-price=${price}>FE${price}</button>`)
          .join('')}
      </div>
    `;
  }

  protected setEvent() {
    this.addEvent('click', '.vending-machine__purchase-button', (e: MouseEvent) => {
      const button = e.target as HTMLButtonElement;
      this.props.onPurchase?.(Number(button.dataset.price));
    })
  }
}
