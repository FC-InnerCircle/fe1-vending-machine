export default class BalanceInformation {
  constructor() {}

  render(): HTMLElement {
    const $balanceInformation = document.createElement("div");
    $balanceInformation.innerHTML = `
      <input type="text" name="balance" readonly class="w-full text-center py-3" value="0">
    `;
    return $balanceInformation;
  }
}
