export default class Layout {
  leftSlot: HTMLElement;
  rightSlot: HTMLElement;

  constructor() {
    this.leftSlot = document.createElement("div");
    this.rightSlot = document.createElement("div");
  }

  render(): HTMLElement {
    const container = document.createElement("div");

    container.innerHTML = `
    <div class="mx-auto max-w-2xl lg:max-w-7xl">
      <div class="grid grid-cols-1 sm:grid-cols-2">
        <div id="layout-left-slot" class="group"></div>
        <div id="layout-right-slot" class="group"></div>
      </div>
    </div>
    `;

    const leftSlotContainer = container.querySelector("#layout-left-slot");
    leftSlotContainer?.appendChild(this.leftSlot);

    const rightSlotContainer = container.querySelector("#layout-right-slot");
    rightSlotContainer?.appendChild(this.rightSlot);

    return container;
  }
}
