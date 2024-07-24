const INIT_VALUE = "0";

export class CurrentAmountInput {
  private inputElement: HTMLInputElement;
  private dataValue: number;
  private formatter = new Intl.NumberFormat("en", {
    style: "currency",
    currency: "krw",
    maximumSignificantDigits: 21,
  });
  private updateValue(value: number) {
    this.dataValue = value;
    this.inputElement.value = this.formatter
      .format(this.dataValue)
      .toLowerCase();
  }

  constructor() {
    this.inputElement = document.getElementById(
      "current-amount-input"
    ) as HTMLInputElement;
    if (!this.inputElement) {
      throw new Error(`Element with id amount-input not found`);
    }
    this.inputElement.value = INIT_VALUE;
    this.dataValue = 0;
  }

  getCurrentAmount() {
    return this.dataValue;
  }

  resetInsertAmount() {
    this.dataValue = 0;
    this.inputElement.value = INIT_VALUE;
  }
  addAmount(value: number) {
    const amount = this.dataValue + value;
    this.updateValue(amount);
  }
  subtractAmount(value: number) {
    const amount = this.dataValue - value;
    this.updateValue(amount);
  }
  alertInsufficientAmount(value: number) {
    const currentValue = this.inputElement.value;
    //필요한 금액 알리기
    this.inputElement.value = this.formatter.format(value).toLowerCase();

    setTimeout(() => {
      //원래 금액으로
      this.inputElement.value = currentValue;
    }, 2000);
  }
}
