import {prices} from "../constants.ts";
import Component from "../core/component.ts";

interface Props {
  balance: number;
  onPurchase?: (title: string, price: number) => void;
}

export default class VendingMachine extends Component<Props> {
  template() {
    const {balance} = this.props;

    return `
      <div class="vending-machine__balance">${balance.toLocaleString()}</div>
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
      const title = button.textContent ?? '';
      const price = Number(button.dataset.price);
      this.props.onPurchase?.(title, price);
    });

    let isPriceShowing = false;

    this.addEvent('mousedown', '.vending-machine__purchase-button', (e: MouseEvent) => {
      const purchaseButtonElement = e.target as HTMLButtonElement;
      const price = Number(purchaseButtonElement.dataset.price);

      if (this.props.balance >= price) return;

      const balanceElement = this.target.querySelector('.vending-machine__balance') as HTMLDivElement;
      balanceElement.textContent = price.toLocaleString();

      isPriceShowing = true;
    });

    document.addEventListener('mouseup', () => {
      if (!isPriceShowing) return;

      const balanceElement = this.target.querySelector('.vending-machine__balance') as HTMLDivElement;
      balanceElement.textContent = this.props.balance.toLocaleString();

      isPriceShowing = false;
    });
  }
}
