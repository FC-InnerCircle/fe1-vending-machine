export class VendingMachine {
  private template = `<div>
    <div class="coin-control-container">
      <input class="amount-input" type="number" />
      <button class="insert">투입</button>
      <button class="return">반환</button>
    </div>
  </div>`;

  private totalAmount = 0;

  constructor(private container: HTMLElement) {
    this.container = container;
  }

  render() {
    this.container.innerHTML = this.template;
    this.setUpEvent();
  }

  private insertCoin(amount: number) {
    if (amount < 0) return;
    this.totalAmount += amount;
  }

  private returnCoin() {
    this.totalAmount = 0;
  }

  private setUpEvent(): () => void {
    const amountInput = this.container.querySelector(
      ".amount-input"
    )! as HTMLInputElement;
    const insertButton = this.container.querySelector(
      ".insert"
    )! as HTMLButtonElement;
    const returnButton = this.container.querySelector(
      ".return"
    )! as HTMLButtonElement;

    const onChangeAmount = (e: Event) => {
      const target = e.target as HTMLInputElement;
      target.value = target.value.replace(/[^0-9]/g, "");
    };

    const onClickInsert = () => {
      const amount = Number(amountInput.value);
      this.insertCoin(amount);
      amountInput.value = "";
    };

    const onClickReturn = () => {
      this.returnCoin();
    };

    amountInput.addEventListener("input", onChangeAmount);
    insertButton.addEventListener("click", onClickInsert);
    returnButton.addEventListener("click", onClickReturn);

    return () => {
      amountInput.removeEventListener("input", onChangeAmount);
      insertButton.removeEventListener("click", onClickInsert);
      returnButton.removeEventListener("click", onClickReturn);
    };
  }
}
