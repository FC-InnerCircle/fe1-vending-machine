import { vendingMachineStore } from '../../stores/vendingMachine';

class VendingMachineCostDisplay extends HTMLElement {
  private shadow;

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
    vendingMachineStore.subscribe(this.update.bind(this));
  }

  connectedCallback() {
    this.render();
  }

  styleSheet() {
    return `
      <style>
        .container {
          width: 100%;
          height: 20px;

          border: 1px solid #000000;
          text-align: center;
        }
      </style>
    `;
  }

  template() {
    const { totalCost, tempCost } = vendingMachineStore.getState();

    const displayedCost = tempCost === 0 ? totalCost : tempCost;

    return `
      <div class="container">${displayedCost.toLocaleString()}</div>
    `;
  }

  update() {
    this.render();
  }

  render() {
    this.shadow.innerHTML = `
      ${this.styleSheet()}
      ${this.template()}
    `;
  }
}

export default VendingMachineCostDisplay;
