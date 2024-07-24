export default class BalanceInformation {
  constructor() {}

  render(): HTMLElement {
    const balanceInformation = document.createElement("div");
    balanceInformation.textContent = "balanceInformation";
    return balanceInformation;
  }
}
