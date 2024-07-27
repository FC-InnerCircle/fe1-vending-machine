import { store } from "../store";

export type Item = {
  price: number;
  label: string;
  index: number;
};

const range = (start: number, stop: number, step = 1) =>
  Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step);

export const ITEMS: Item[] = range(300, 1100, 100).map((price, i) => ({
  price,
  label: `FE${price}`,
  index: i + 1,
}));
export default class VendingItems {
  constructor() {}

  render(): HTMLElement {
    const $vendingItems = document.createElement("div");
    $vendingItems.className = "grid grid-cols-3 gap-1";
    // TODO: 이벤트 위임
    ITEMS.forEach((item) => {
      const button = document.createElement("button");
      button.textContent = item.label;
      button.className =
        "flex w-full justify-center rounded bg-indigo-300 hover:bg-indigo-400 active:bg-indigo-600 active:text-white font-semibold py-3";
      button.addEventListener("click", () => this.selectItem(item));
      $vendingItems.appendChild(button);
    });

    return $vendingItems;
  }
  selectItem(item: Item) {
    const balance = store.getBalance();
    if (balance === 0 || balance < item.price) return;
    store.setControl({ type: "buy", value: item });
  }
}
