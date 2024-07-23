import { PRICE_LISTS } from "./constants";

export class VendingItems {
  private getTemplate(): string {
    return `
      <div class="item-list">
        ${PRICE_LISTS.map(
          (price) =>
            `<button class="item" data-price="${price}">FE${price.toString()}</button>`
        ).join("")}
      </div>
    `;
  }

  constructor(
    private $container: HTMLElement,
    private handlers: {
      onPurchase: (price: number) => void;
      onItemMouseDown: (price: number) => void;
      onItemMouseUp: () => void;
    }
  ) {
    this.initialize();
  }

  initialize() {
    this.render();
    this.setUpEvent();
  }

  render() {
    this.$container.innerHTML = this.getTemplate();
  }

  setUpEvent() {
    this.$container.addEventListener(
      "mousedown",
      this.handleMouseEvent.bind(this)
    );
    this.$container.addEventListener(
      "mouseup",
      this.handleMouseEvent.bind(this)
    );
  }

  private handleMouseEvent(e: Event) {
    const target = e.target as HTMLElement;
    if (!target.matches(".item")) return;

    const price = parseInt(target.dataset.price!);

    if (e.type === "mousedown") {
      this.handlers.onItemMouseDown(price);
    } else if (e.type === "mouseup") {
      this.handlers.onPurchase(price);
      this.handlers.onItemMouseUp();
    }
  }
}
