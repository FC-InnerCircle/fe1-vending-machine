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
      balance: 0,
      logs: [],
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

    new VendingMachine(vendingMachineElement, {balance, onPurchase: this.purchase.bind(this)});
    new Amount(amountElement, {onDeposit: this.deposit.bind(this)});
    new Log(logElement, {logs});
  }

  private purchase(title: string, price: number) {
    const balance = this.state.balance - price;
    const logs = [...this.state.logs, `${title}을 구매했습니다.`];
    this.setState({balance, logs});
  }

  private deposit(amount: number) {
    const balance = this.state.balance + amount;
    const logs = [...this.state.logs, `${amount.toLocaleString()}원을 투입했습니다.`];
    this.setState({balance, logs});
  }
}
