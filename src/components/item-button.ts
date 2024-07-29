export class ItemButton {
  label: string;
  price: number;

  constructor(label: string, price: number) {
    this.label = label;
    this.price = price;
  }

  render(): HTMLElement {
    const listElement = document.createElement("li");
    const buttonElement = document.createElement("button");

    buttonElement.className = "product-button";
    buttonElement.textContent = this.label;
    buttonElement.dataset.price = this.price.toString();

    listElement.appendChild(buttonElement);
    return listElement;
  }
}
