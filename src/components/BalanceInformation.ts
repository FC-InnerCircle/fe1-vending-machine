import { store } from "../store";

export default class BalanceInformation {
  balance: number;
  $balanceInformation!: HTMLElement;

  constructor() {
    this.balance = store.getBalance();
    store.subscribe(() => this.updateInputValue());
  }

  render(): HTMLElement {
    const $balanceInformation = document.createElement("div");
    $balanceInformation.innerHTML = `
      <input type="text" name="balance" readonly class="w-full text-center py-3" value="0">
    `;
    this.$balanceInformation = $balanceInformation;
    return $balanceInformation;
  }
  updateInputValue() {
    this.balance = store.getBalance();
    const $balanceInput = this.$balanceInformation.querySelector(
      'input[name="balance"]'
    ) as HTMLInputElement;
    $balanceInput.value = this.balance.toLocaleString("ko-KR");
  }
}
