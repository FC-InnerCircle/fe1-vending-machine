import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { VendingItems } from "./vending-items";
import { PRICE_LISTS } from "./constants";

describe("VendingItems", () => {
  let container: HTMLElement;
  let vendingItems: VendingItems;
  let onPurchase: ReturnType<typeof vi.fn>;
  let onItemMouseDown: ReturnType<typeof vi.fn>;
  let onItemMouseUp: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);

    onPurchase = vi.fn();
    onItemMouseDown = vi.fn();
    onItemMouseUp = vi.fn();

    vendingItems = new VendingItems(container, {
      onPurchase,
      onItemMouseDown,
      onItemMouseUp,
    });

    vendingItems.render();
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  it("should render item buttons with correct prices", () => {
    PRICE_LISTS.forEach((price) => {
      expect(container.innerHTML).toContain(`FE${price}`);
    });
  });

  it("should call onItemMouseDown when mousedown on item", () => {
    const itemButton = container.querySelector(".item") as HTMLElement;
    const price = parseInt(itemButton.dataset.price!, 10);

    itemButton.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }));

    expect(onItemMouseDown).toHaveBeenCalledWith(price);
  });

  it("should call onPurchase and onItemMouseUp when mouseup on item", () => {
    const itemButton = container.querySelector(".item") as HTMLElement;
    const price = parseInt(itemButton.dataset.price!, 10);

    itemButton.dispatchEvent(new MouseEvent("mouseup", { bubbles: true }));

    expect(onPurchase).toHaveBeenCalledWith(price);
    expect(onItemMouseUp).toHaveBeenCalled();
  });
});
