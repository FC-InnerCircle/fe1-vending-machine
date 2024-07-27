import { store } from "../store";
export default class MoneySlot {
  constructor() {}

  render(): HTMLElement {
    const $moneySlot = document.createElement("div");
    $moneySlot.innerHTML = `
      <div>
        <form name="amount-form" class="w-full">
          <input name="amount" type="number" min="1" step="1" class="py-2 text-right" style="width: calc(100% - 132px);">
          <button type="submit" class="justify-center rounded">투입</button>
          <button type="reset" class="justify-center rounded">반환</button>
        </form>
      </div>
    `;

    const $form = $moneySlot.querySelector("form") as HTMLFormElement;

    $form?.addEventListener("submit", (e) => {
      e.preventDefault();
      const $input = $form["amount"];
      if (!$input.value) return;
      store.setControl({ type: "insert", value: $input.value });
      $input.value = "";
    });

    $form?.addEventListener("reset", () => {
      store.setControl({ type: "return" });
    });
    return $moneySlot;
  }
}
