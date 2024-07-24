const INIT_VALUE = "";

export class InsertAmountInput {
  private inputElement: HTMLInputElement;
  private initialValue: string;
  private preventNonNumericInput(event: KeyboardEvent) {
    const key = event.key;
    if (
      key === "Backspace" ||
      key === "Delete" ||
      key === "ArrowLeft" ||
      key === "ArrowRight" ||
      key === "Tab" ||
      key === "Escape" ||
      key === "Enter"
    )
      return;

    // Prevent non-numeric input
    if (key < "0" || key > "9") {
      event.preventDefault();
    }
  }
  constructor() {
    this.inputElement = document.getElementById(
      "amount-input"
    ) as HTMLInputElement;
    if (!this.inputElement) {
      throw new Error(`Element with id amount-input not found`);
    }
    this.initialValue = INIT_VALUE;
    this.inputElement.addEventListener("keydown", this.preventNonNumericInput);
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
