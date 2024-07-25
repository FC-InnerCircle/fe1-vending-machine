import { vendingMachineStore } from '../../stores/vendingMachine';

class LogMessageDisplay extends HTMLElement {
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
          padding: 0;
          margin: 0;

          width: 100%;
          height: 230px;  

          overflow-y:auto;
          border: 1px solid #000000;
        }
      </style>
    `;
  }

  update() {
    this.render();
    const container = this.shadow.querySelector('.container');

    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }

  template() {
    const { logs } = vendingMachineStore.getState();

    return `
      <ul class="container">${logs
        .map(
          (log) => `<log-message log='${JSON.stringify(log)}'></log-message>`
        )
        .join('')}</ul>
    `;
  }

  render() {
    this.shadow.innerHTML = `
      ${this.styleSheet()}
      ${this.template()}
    `;
  }
}

export default LogMessageDisplay;
