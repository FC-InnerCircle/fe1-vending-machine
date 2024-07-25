class VendingMachineProductPanel extends HTMLElement {
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

          display: flex;
          flex-direction: column;
          row-gap: 20px;
        }
      </style>
    `;
  }

  template() {
    return `
      <section class="container">
        <vending-machine-price-display></vending-machine-price-display>
        <vending-machine-products></vending-machine-products>
      </section>
    `;
  }

  render() {
    this.shadow.innerHTML = `
      ${this.styleSheet()}
      ${this.template()}
    `;
  }
}

export default VendingMachineProductPanel;
