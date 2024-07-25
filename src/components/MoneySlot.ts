export default class MoneySlot {
  constructor() {}

  render(): HTMLElement {
    const $moneySlot = document.createElement("div");
    $moneySlot.textContent = "moneySlot";
    return $moneySlot;
  }
}
