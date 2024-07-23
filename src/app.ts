import Component from "./core/component.ts";
import Amount from "./components/amount.ts";
import Log from "./components/log.ts";

interface State {
  logs: Array<string>;
}

export default class App extends Component<{}, State> {
  protected initializeState(): State {
    return {
      logs: ['로그', '로그', '로그', '로그', '로그', '로그', '로그', '로그', '로그', '로그', '로그'],
    };
  }

  template () {
    return `
      <div>
        <h1>Vending Machine</h1>
        <div class="amount"></div>
        <div class="log"></div>
      </div>
    `;
  }

  protected mounted() {
    const amountElement = document.querySelector('.amount') as HTMLDivElement;
    const logElement = document.querySelector('.log') as HTMLDivElement;

    const {logs} = this.state;

    new Amount(amountElement, {});
    new Log(logElement, {logs});
  }
}
