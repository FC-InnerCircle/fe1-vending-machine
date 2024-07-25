class VendingMachineControlPanel extends HTMLElement {
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
          height: 100%;
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
        <cost-input-control></cost-input-control>
        <log-message-display></log-message-display>
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

export default VendingMachineControlPanel;
