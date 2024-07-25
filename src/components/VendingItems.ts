export default class VendingItems {
  constructor() {}

  render(): HTMLElement {
    const $vendingItems = document.createElement("div");
    $vendingItems.textContent = "vendingItems";
    return $vendingItems;
  }
}
