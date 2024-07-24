const INIT_VALUE = "0";

export class CurrentAmountInput {
  private inputElement: HTMLInputElement;
  private initialValue: string;

  constructor() {
    this.inputElement = document.getElementById(
      "current-amount-input"
    ) as HTMLInputElement;
    if (!this.inputElement) {
      throw new Error(`Element with id amount-input not found`);
    }
    this.initialValue = INIT_VALUE;
  }

  getCurrentAmount() {
    return parseInt(this.inputElement.value);
  }

  resetInsertAmount() {
    this.inputElement.value = this.initialValue;
  }
  addAmount(value: number) {
    this.inputElement.value = (
      parseInt(this.inputElement.value) + value
    ).toString();
  }
  subtractAmount(value: number) {
    this.inputElement.value = (
      parseInt(this.inputElement.value) - value
    ).toString();
  }
  alertInsufficientAmount(value: number) {
    const currentValue = this.inputElement.value;
    //필요한 금액 알리기
    this.inputElement.value = value.toString();

    setTimeout(() => {
      //원래 금액으로
      this.inputElement.value = currentValue;
    }, 2000);
  }
}
