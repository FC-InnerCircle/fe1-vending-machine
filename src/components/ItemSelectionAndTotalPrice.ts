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

export default class ItemSelectionAndTotalPrice {
  selectedItems: Item[];
  totalPriceInput: HTMLInputElement;
  onChange?: (totalPrice: number) => void;
  constructor() {
    this.selectedItems = [];
    this.totalPriceInput = document.createElement("input");
    this.totalPriceInput.type = "text";
    this.totalPriceInput.readOnly = true;
    this.totalPriceInput.className = "w-full text-center py-3";
    this.totalPriceInput.value = Number(0).toLocaleString("ko-KR");
  }

  render(): HTMLElement {
    const container = document.createElement("div");
    container.innerHTML = `
      <div>
        <div id="total-price-container"></div>
        <div id="items-container" class="grid grid-cols-3 gap-1"></div>
      </div>
    `;
    const totalPriceContainer = container.querySelector(
      "#total-price-container"
    );
    const itemsContainer = container.querySelector("#items-container");

    items.forEach((item) => {
      const button = document.createElement("button");
      button.textContent = item.label;
      button.className =
        "flex w-full justify-center rounded bg-indigo-300 hover:bg-indigo-400 active:bg-indigo-600 active:text-white font-semibold py-3";
      button.addEventListener("click", () => this.selectItem(item));
      itemsContainer?.appendChild(button);
    });

    totalPriceContainer?.appendChild(this.totalPriceInput);
    return container;
  }
  selectItem(item: Item) {
    this.selectedItems.push(item);
    const totalPrice = this.selectedItems.reduce(
      (sum, currentItem) => sum + currentItem.price,
      0
    );
    this.totalPriceInput.value = totalPrice.toLocaleString("ko-KR");
    if (this.onChange) {
      this.onChange(totalPrice);
    }
  }
}
