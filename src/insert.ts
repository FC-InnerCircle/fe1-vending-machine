const INIT_VALUE = "0";

export class InsertAmountInput {
  private inputElement: HTMLInputElement;
  private initialValue: string;

  constructor() {
    this.inputElement = document.getElementById(
      "amount-input"
    ) as HTMLInputElement;
    if (!this.inputElement) {
      throw new Error(`Element with id amount-input not found`);
    }
    this.initialValue = INIT_VALUE;
  }

  getInsertAmount() {
    return parseInt(this.inputElement.value);
  }

  resetInsertAmount() {
    this.inputElement.value = this.initialValue;
  }
  validateAmount() {
    return parseInt(this.inputElement.value) > 0;
  }
}
