const INIT_VALUE = "0";

export class CurrentAmountInput {
  private currentAmountElement: HTMLParagraphElement;
  private dataValue: number;

  private updateValue(value: number) {
    this.dataValue = value;
    this.currentAmountElement.textContent = value.toLocaleString();
  }

  constructor(el: HTMLParagraphElement) {
    this.currentAmountElement = el;
    if (!this.currentAmountElement) {
      throw new Error(`Element with id amount-input not found`);
    }
    this.currentAmountElement.textContent = INIT_VALUE;
    this.dataValue = 0;
  }

  getCurrentAmount() {
    return this.dataValue;
  }

  resetInsertAmount() {
    this.dataValue = 0;
    this.currentAmountElement.textContent = INIT_VALUE;
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
    const currentValue = this.currentAmountElement.textContent;
    //필요한 금액 알리기
    this.currentAmountElement.textContent = value.toLocaleString();

    setTimeout(() => {
      //원래 금액으로
      this.currentAmountElement.textContent = currentValue;
    }, 2000);
  }
}
