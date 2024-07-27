import { Component } from "./component";
import { PRICE_LISTS } from "./constants";

export class VendingItems extends Component<
  undefined,
  {
    onPurchase: (price: number) => void;
    onItemMouseDown: (price: number) => void;
    onItemMouseUp: () => void;
  }
> {
  protected getTemplate(): string {
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
    protected $container: HTMLElement,
    handlers: {
      onPurchase: (price: number) => void;
      onItemMouseDown: (price: number) => void;
      onItemMouseUp: () => void;
    }
  ) {
    super($container, undefined, handlers);
  }

  protected setUpEvent(): () => void {
    const handleMouseEvent = this.handleMouseEvent.bind(this);

    this.$container.addEventListener("mousedown", handleMouseEvent);
    this.$container.addEventListener("mouseup", handleMouseEvent);

    // 클린업 함수를 반환
    return () => {
      this.$container.removeEventListener("mousedown", handleMouseEvent);
      this.$container.removeEventListener("mouseup", handleMouseEvent);
    };
  }

  private handleMouseEvent(e: Event) {
    const target = e.target as HTMLElement;
    if (!target.matches(".item")) return;

    const price = parseInt(target.dataset.price!);

    if (e.type === "mousedown") {
      this.handlers?.onItemMouseDown(price);
    } else if (e.type === "mouseup") {
      this.handlers?.onPurchase(price);
      this.handlers?.onItemMouseUp();
    }
  }
}
