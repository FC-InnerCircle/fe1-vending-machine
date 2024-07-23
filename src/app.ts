import Component from "./core/component.ts";
import Amount from "./components/amount.ts";
import Log from "./components/log.ts";
import VendingMachine from "./components/vending-machine.ts";

interface State {
  balance: number;
  logs: Array<string>;
}

export default class App extends Component<{}, State> {
  protected initializeState(): State {
    return {
      balance: 10000000,
      logs: ['로그', '로그', '로그', '로그', '로그', '로그', '로그', '로그', '로그', '로그', '로그'],
    };
  }

  template () {
    return `
      <main class="main">
        <div>
          <div class="vending-machine"></div>
        </div>
        <div>
          <div class="amount"></div>
          <div class="log"></div>
        </div>
      </main>
    `;
  }

  protected mounted() {
    const vendingMachineElement =  document.querySelector('.vending-machine') as HTMLDivElement;
    const amountElement = document.querySelector('.amount') as HTMLDivElement;
    const logElement = document.querySelector('.log') as HTMLDivElement;

    const {balance, logs} = this.state;

    new VendingMachine(vendingMachineElement, {balance});
    new Amount(amountElement, {});
    new Log(logElement, {logs});
  }
}
