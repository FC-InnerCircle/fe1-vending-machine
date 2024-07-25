export default class Layout {
  leftSlot: HTMLElement;
  rightSlot: HTMLElement;

  constructor() {
    this.leftSlot = document.createElement("div");
    this.rightSlot = document.createElement("div");
  }

  render(): HTMLElement {
    const $layout = document.createElement("div");

    $layout.innerHTML = `
    <div class="mx-auto max-w-2xl lg:max-w-7xl">
      <div class="grid grid-cols-1 sm:grid-cols-2">
        <div id="layout-left-slot" class="group"></div>
        <div id="layout-right-slot" class="group"></div>
      </div>
    </div>
    `;

    const $layoutLeftSlot = $layout.querySelector("#layout-left-slot");
    $layoutLeftSlot?.appendChild(this.leftSlot);

    const $layoutRightSlot = $layout.querySelector("#layout-right-slot");
    $layoutRightSlot?.appendChild(this.rightSlot);

    return $layout;
  }
}
