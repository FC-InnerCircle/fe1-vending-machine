const VENDING_MACHINE_ITEMS = [
  { id: 0, name: 'FE300', cost: 300 },
  { id: 1, name: 'FE400', cost: 400 },
  { id: 2, name: 'FE500', cost: 500 },
  { id: 3, name: 'FE600', cost: 600 },
  { id: 4, name: 'FE700', cost: 700 },
  { id: 5, name: 'FE800', cost: 800 },
  { id: 6, name: 'FE900', cost: 900 },
  { id: 7, name: 'FE1000', cost: 1000 },
  { id: 8, name: 'FE1100', cost: 1100 },
];

class VendingMachineProducts extends HTMLElement {
  private shadow;

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  styleSheet() {
    return `
      <style>
        .container {
          width: 320px;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
        }
      </style>
    `;
  }

  template() {
    return `
      <div class="container">
        ${VENDING_MACHINE_ITEMS.map(
          (item) =>
            `<vending-machine-product name="${item.name}" cost="${item.cost}"></vending-machine-product>`
        ).join('')}
      </div>
    `;
  }

  render() {
    this.shadow.innerHTML = `
      ${this.styleSheet()}
      ${this.template()}
    `;
  }
}

export default VendingMachineProducts;
