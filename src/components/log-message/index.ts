import { getLogMessage } from '../../utils/log';

class LogMessage extends HTMLElement {
  private shadow;

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  template() {
    const log = JSON.parse(this.getAttribute('log') || '{}');
    return `
      <li>${getLogMessage(log)}</li>
    `;
  }

  render() {
    this.shadow.innerHTML = `
      ${this.template()}
    `;
  }
}

export default LogMessage;
