const INIT_VALUE = "";

const FUNCTION_KEYS = [
  "Backspace",
  "Delete",
  "ArrowLeft",
  "ArrowRight",
  "Tab",
  "Escape",
  "Enter",
];
export class InsertAmountInput {
  private inputElement: HTMLInputElement;
  private initialValue: string;
  private isValidAmount(amount: string) {
    // 정규식을 사용하여 숫자만 포함하는지 확인
    const regex = /^\d+$/;
    return regex.test(amount);
  }
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
    return this.isValidAmount(this.inputElement.value);
  }
  alertError() {
    const currentValue = this.inputElement.value;
    //필요한 금액 알리기
    this.inputElement.value = "유효한 숫자만 입력하세요";

    setTimeout(() => {
      //원래 금액으로
      this.inputElement.value = currentValue;
    }, 2000);
  }
}
