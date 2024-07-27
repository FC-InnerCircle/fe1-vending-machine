import { Component } from "./component";
import { PRICE_LISTS } from "./constants";
import { DisplayInfo } from "./display-info";
import { DisplayLog } from "./display-log";
import { VendingItems } from "./vending-items";

interface VendingMachineState {
  totalAmount: number;
  logs: string[];
  displayOnlyPrice?: number;
}

export class VendingMachine extends Component<VendingMachineState> {
  protected getTemplate(): string {
    return `<div class="vending-machine-container">
  <div class="vending-machine">
    <div class="display-container"></div>
    <div class="item-container"></div>
  </div>

  <div class="control-box">
    <div class="coin-control-container">
      <input class="amount-input" type="number" />
      <button class="insert">투입</button>
      <button class="return">반환</button>
    </div>
    <div class="log-container"></div>
  </div>
  </div>`;
  }

  private displayInfo: DisplayInfo | undefined;
  private logDisplay: DisplayLog | undefined;
  private vendingItems: VendingItems | undefined;

  constructor($container: HTMLElement, initialState?: VendingMachineState) {
    const state: VendingMachineState = {
      totalAmount: 0,
      logs: [],
      displayOnlyPrice: undefined,
      ...initialState,
    };
    super($container, state);
  }

  protected onRender() {
    this.$container.innerHTML = this.getTemplate();
    const displayContainer = this.$container.querySelector(
      ".display-container"
    )! as HTMLDivElement;
    const logContainer = this.$container.querySelector(
      ".log-container"
    )! as HTMLDivElement;
    const itemContainer = this.$container.querySelector(
      ".item-container"
    )! as HTMLDivElement;

    this.displayInfo = new DisplayInfo(displayContainer, {
      totalAmount: this.state?.totalAmount ?? 0,
    });

    this.logDisplay = new DisplayLog(logContainer, {
      logs: this.state?.logs ?? [],
    });

    this.vendingItems = new VendingItems(itemContainer, {
      onPurchase: this.onPurchase.bind(this),
      onItemMouseDown: this.onItemMouseDown.bind(this),
      onItemMouseUp: this.onItemMouseUp.bind(this),
    });
  }

  render() {
    super.render();
    this.displayInfo?.render();
    this.logDisplay?.render();
    this.vendingItems?.render();
  }

  setState(nextState: Partial<VendingMachineState>) {
    if (!this.state) return;
    super.setState(nextState);
    this.displayInfo?.setState({
      totalAmount:
        this.state.totalAmount - (this.state.displayOnlyPrice ?? 0) > 0
          ? this.state.totalAmount
          : this.state.displayOnlyPrice ?? this.state.totalAmount,
    });
    this.logDisplay?.setState({ logs: this.state.logs });
  }

  private insertCoin(amount: number) {
    if (amount <= 0) return;
    const totalAmount = (this.state?.totalAmount ?? 0) + amount;
    const logs = [
      ...(this.state?.logs ?? []),
      `${amount.toLocaleString()}원을 넣었습니다.`,
    ];

    this.setState({
      totalAmount,
      logs,
    });
  }

  private returnCoin() {
    if (this.state.totalAmount === 0) return;
    const refundAmount = this.state.totalAmount;
    this.setState({
      totalAmount: 0,
      logs: [
        ...this.state.logs,
        `잔돈 ${refundAmount.toLocaleString()}원을 반환합니다.`,
      ],
    });
  }

  private onPurchase(price: number) {
    if (this.state.totalAmount < price) return;

    this.setState({
      totalAmount: this.state.totalAmount - price,
      logs: [...this.state.logs, `FE${price}를 구매했습니다.`],
    });

    const minPrice = Math.min(...PRICE_LISTS);

    if (this.state.totalAmount < minPrice) {
      this.returnCoin();
    }
  }

  private onItemMouseDown(price: number) {
    this.setState({ displayOnlyPrice: price });
  }

  private onItemMouseUp() {
    this.setState({ displayOnlyPrice: undefined });
  }

  protected setUpEvent() {
    const amountInput = this.$container.querySelector(
      ".amount-input"
    )! as HTMLInputElement;
    const insertButton = this.$container.querySelector(
      ".insert"
    )! as HTMLButtonElement;
    const returnButton = this.$container.querySelector(
      ".return"
    )! as HTMLButtonElement;

    amountInput.addEventListener("input", this.onChangeAmount);
    insertButton.addEventListener("mouseup", this.onClickInsert.bind(this));
    returnButton.addEventListener("mouseup", this.onClickReturn.bind(this));

    return () => {
      amountInput.removeEventListener("input", this.onChangeAmount);
      insertButton.removeEventListener(
        "mouseup",
        this.onClickInsert.bind(this)
      );
      returnButton.removeEventListener(
        "mouseup",
        this.onClickReturn.bind(this)
      );
    };
  }

  private onChangeAmount(e: Event) {
    const target = e.target as HTMLInputElement;
    target.value = target.value.replace(/[^0-9]/g, "");
  }

  private onClickInsert() {
    const amountInput = this.$container.querySelector(
      ".amount-input"
    )! as HTMLInputElement;
    const amount = Number(amountInput.value);
    this.insertCoin(amount);
    amountInput.value = "";
  }

  private onClickReturn() {
    this.returnCoin();
  }
}
