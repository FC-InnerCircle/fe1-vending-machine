type Item = {
  price: number;
  label: string;
  index: number;
};

const range = (start: number, stop: number, step = 1) =>
  Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step);
const items: Item[] = range(300, 1100, 100).map((price, i) => ({
  price,
  label: `FE${price}`,
  index: i + 1,
}));
export default class VendingItems {
  constructor() {}

  render(): HTMLElement {
    const $vendingItems = document.createElement("div");
    $vendingItems.innerHTML = `
      <div class="grid grid-cols-3 gap-1">
        ${items
          .map(
            (item) => `
          <button type="button" class="flex w-full justify-center rounded bg-indigo-300 hover:bg-indigo-400 active:bg-indigo-600 active:text-white font-semibold py-3">
            ${item.label}
          </button>
        `
          )
          .join("")}  
      </div>
    `;
    // $vendingItems.textContent = "vendingItems";
    return $vendingItems;
  }
}
