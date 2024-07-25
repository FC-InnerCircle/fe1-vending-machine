import {
  vendingMachineActions,
  vendingMachineStore,
} from '../../stores/vendingMachine';
import { VENDING_MACHINE_ITEMS } from '../vending-machine-products';
class VendingMachineProduct extends HTMLElement {
  private shadow;

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
    this.attachEvent();
  }

  styleSheet() {
    return `
      <style>
        button {
          width: 100px;
          height: 70px;

          font-size: 20px;

          cursor: pointer;
          border: 1px solid #262626;
          background: #A0D3F2;

          &:hover {
            background: #50B4F2;
          }

          &:active {
            background: #1F74BF;
            color: #F2F2F2;
          }
        }
      </style>
    `;
  }

  template() {
    const name = this.getAttribute('name');
    return `
      <button>${name}</button>
    `;
  }

  handlePurchase() {
    const name = this.getAttribute('name') || '';
    const cost = this.getAttribute('cost') || '0';
    const { totalCost } = vendingMachineStore.getState();

    if (totalCost >= Number(cost)) {
      vendingMachineActions.purchase(name, Number(cost));

      if (
        totalCost - Number(cost) <
        Math.min(...VENDING_MACHINE_ITEMS.map((item) => item.cost))
      ) {
        vendingMachineActions.returnCost();
      }
    }
  }

  handleDisplayInsufficientCost() {
    const cost = this.getAttribute('cost') || '0';
    const { totalCost } = vendingMachineStore.getState();

    if (totalCost < Number(cost)) {
      vendingMachineActions.displayInsufficientCost(Number(cost));
    }
  }

  handleDisplayTotalCost() {
    const cost = this.getAttribute('cost') || '0';
    const { totalCost } = vendingMachineStore.getState();

    if (totalCost < Number(cost)) {
      vendingMachineActions.displayInsufficientCost(0);
    }
  }

  attachEvent() {
    this.shadow.addEventListener(
      'mousedown',
      this.handleDisplayInsufficientCost.bind(this)
    );
    this.shadow.addEventListener(
      'mouseup',
      this.handleDisplayTotalCost.bind(this)
    );
    this.shadow.addEventListener('click', this.handlePurchase.bind(this));
  }

  render() {
    this.shadow.innerHTML = `
      ${this.styleSheet()}
      ${this.template()}
    `;
  }
}

export default VendingMachineProduct;
