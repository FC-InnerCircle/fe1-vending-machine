import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { VendingMachine } from "./vending-machine";

describe("VendingMachine Integration Test", () => {
  let container: HTMLElement;
  let vendingMachine: VendingMachine;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
    vendingMachine = new VendingMachine(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  it("초기에 DOM 요소가 제대로 렌더링 된다", () => {
    expect(container.querySelector(".display-container")).toBeTruthy();
    expect(container.querySelector(".item-container")).toBeTruthy();
    expect(container.querySelector(".log-container")).toBeTruthy();
    expect(container.querySelector(".amount-input")).toBeTruthy();
    expect(container.querySelector(".insert")).toBeTruthy();
    expect(container.querySelector(".return")).toBeTruthy();
  });

  it("동전이 투입되면 display와 logs는 투입된 값을 렌더링한다", () => {
    const amountInput = container.querySelector(
      ".amount-input"
    ) as HTMLInputElement;
    const insertButton = container.querySelector(
      ".insert"
    ) as HTMLButtonElement;

    amountInput.value = "1000";
    amountInput.dispatchEvent(new Event("input"));
    insertButton.dispatchEvent(new MouseEvent("mouseup"));

    const display = container.querySelector(".display") as HTMLDivElement;
    const logs = container.querySelector(".logs") as HTMLDivElement;

    expect(display.textContent).toContain("1,000원");
    expect(logs.textContent).toContain("1,000원을 넣었습니다.");
  });

  it("투입되는 동전은 음수일 수 없다", () => {
    const amountInput = container.querySelector(
      ".amount-input"
    ) as HTMLInputElement;

    amountInput.value = "-1000";
    amountInput.dispatchEvent(new Event("input", { bubbles: true }));
    expect(amountInput.value).toBe("1000");
  });

  it("반환버튼을 누르면 투입된 동전이 반환 되어야 한다", () => {
    const amountInput = container.querySelector(
      ".amount-input"
    ) as HTMLInputElement;
    const insertButton = container.querySelector(
      ".insert"
    ) as HTMLButtonElement;
    const returnButton = container.querySelector(
      ".return"
    ) as HTMLButtonElement;

    amountInput.value = "1000";
    amountInput.dispatchEvent(new Event("input", { bubbles: true }));
    insertButton.dispatchEvent(new MouseEvent("mouseup"));
    returnButton.dispatchEvent(new MouseEvent("mouseup"));

    const display = container.querySelector(".display") as HTMLDivElement;
    const logs = container.querySelector(".logs") as HTMLDivElement;

    expect(display.textContent).toContain("0원");
    expect(logs.textContent).toContain("잔돈 1,000원을 반환합니다.");
  });

  it("투입금액이 물품금액보다 크다면 물건은 정상적으로 구매된다", () => {
    const amountInput = container.querySelector(
      ".amount-input"
    ) as HTMLInputElement;
    const insertButton = container.querySelector(
      ".insert"
    ) as HTMLButtonElement;

    amountInput.value = "1000";
    amountInput.dispatchEvent(new Event("input"));
    insertButton.dispatchEvent(new MouseEvent("mouseup"));

    const itemButton = container.querySelector(".item") as HTMLElement;
    const price = parseInt(itemButton.dataset.price!, 10);

    itemButton.dispatchEvent(new MouseEvent("mousedown"));
    itemButton.dispatchEvent(new MouseEvent("mouseup", { bubbles: true }));

    const display = container.querySelector(".display") as HTMLDivElement;
    const logs = container.querySelector(".logs") as HTMLDivElement;

    expect(display.textContent).toContain(`${1000 - price}원`);
    expect(logs.textContent).toContain(`FE${price}를 구매했습니다.`);
  });

  it("투입금액이 물품금액보다 작다면 물건은 정상적으로 구매되지 않는다", () => {
    const itemButton = container.querySelector(".item") as HTMLElement;
    const price = parseInt(itemButton.dataset.price!, 10);

    itemButton.dispatchEvent(new MouseEvent("mousedown"));
    itemButton.dispatchEvent(new MouseEvent("mouseup"));

    const display = container.querySelector(".display") as HTMLDivElement;
    const logs = container.querySelector(".logs") as HTMLDivElement;

    expect(display.textContent).toContain("0원");
    expect(logs.textContent).not.toContain(`FE${price}를 구매했습니다.`);
  });

  it("물품을 구매한뒤 물건의 최소값 보다 작다면 잔돈을 반환한다", () => {
    const amountInput = container.querySelector(
      ".amount-input"
    ) as HTMLInputElement;
    const insertButton = container.querySelector(
      ".insert"
    ) as HTMLButtonElement;

    amountInput.value = "1000";
    amountInput.dispatchEvent(new Event("input"));
    insertButton.dispatchEvent(new MouseEvent("mouseup"));

    const itemButton = container.querySelector(
      ".item[data-price='800']"
    ) as HTMLElement;
    itemButton.dispatchEvent(new MouseEvent("mousedown"));
    itemButton.dispatchEvent(new MouseEvent("mouseup", { bubbles: true }));

    const returnButton = container.querySelector(
      ".return"
    ) as HTMLButtonElement;
    returnButton.dispatchEvent(new MouseEvent("mouseup"));

    const display = container.querySelector(".display") as HTMLDivElement;
    const logs = container.querySelector(".logs") as HTMLDivElement;

    expect(display.textContent).toContain("0원");
    expect(logs.textContent).toContain("잔돈 200원을 반환합니다.");
  });

  it("물품을 구매한뒤 잔돈이 없다면 반환이 되지 않는다", () => {
    const amountInput = container.querySelector(
      ".amount-input"
    ) as HTMLInputElement;
    const insertButton = container.querySelector(
      ".insert"
    ) as HTMLButtonElement;

    amountInput.value = "1000";
    amountInput.dispatchEvent(new Event("input"));
    insertButton.dispatchEvent(new MouseEvent("mouseup"));

    const itemButton = container.querySelector(
      ".item[data-price='1000']"
    ) as HTMLElement;
    itemButton.dispatchEvent(new MouseEvent("mousedown"));
    itemButton.dispatchEvent(new MouseEvent("mouseup", { bubbles: true }));

    const returnButton = container.querySelector(
      ".return"
    ) as HTMLButtonElement;
    returnButton.dispatchEvent(new MouseEvent("mouseup"));

    const display = container.querySelector(".display") as HTMLDivElement;
    const logs = container.querySelector(".logs") as HTMLDivElement;

    expect(display.textContent).toContain("0원");
    expect(logs.textContent).not.toContain("잔돈");
  });
});
