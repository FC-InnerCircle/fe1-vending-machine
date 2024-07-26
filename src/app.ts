import Component from "./core/component.ts";
import Amount from "./components/amount.ts";
import Log from "./components/log.ts";
import VendingMachine from "./components/vending-machine.ts";
import {prices} from "./constants.ts";

interface State {
  balance: number;
  logs: Array<string>;
}

export default class App extends Component<{}, State> {
  template() {
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

  protected initializeState(): State {
    return {
      balance: 0,
      logs: [],
    };
  }

  protected mounted() {
    const vendingMachineElement = document.querySelector('.vending-machine') as HTMLDivElement;
    const amountElement = document.querySelector('.amount') as HTMLDivElement;
    const logElement = document.querySelector('.log') as HTMLDivElement;

    const {balance, logs} = this.state;

    new VendingMachine(vendingMachineElement, {balance, onPurchase: this.purchase.bind(this)});
    new Amount(amountElement, {
      onDeposit: this.deposit.bind(this),
      onWithdraw: this.withdraw.bind(this)
    });
    new Log(logElement, {logs});
  }

  private purchase(title: string, price: number) {
    if (price > this.state.balance) return;

    let balance = this.state.balance - price;
    let logs = [...this.state.logs, `${title}을 구매했습니다.`];

    const minPrice = prices[0];
    if (balance < minPrice) {
      logs = [...logs, `${balance}원을 반환했습니다.`];
      balance = 0;
    }

    this.setState({balance, logs});
  }

  private deposit(amount: number) {
    if (amount <= 0) return;
    const balance = this.state.balance + amount;
    const logs = [...this.state.logs, `${amount.toLocaleString()}원을 투입했습니다.`];
    this.setState({balance, logs});
  }

  private withdraw() {
    if (this.state.balance <= 0) return;
    const balance = 0;
    const logs = [...this.state.logs, `${this.state.balance.toLocaleString()}원을 반환했습니다.`];
    this.setState({balance, logs});
  }
}
