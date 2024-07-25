class VendingMachine extends HTMLElement {
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
          display: flex;

          column-gap: 20px
        }
      </style>
    `;
  }

  template() {
    return `
      <div class="container">
        <vending-machine-product-panel></vending-machine-product-panel>
        <vending-machine-control-panel></vending-machine-control-panel>
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

export default VendingMachine;
