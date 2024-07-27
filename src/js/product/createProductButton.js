import { createElement } from "./createElement";

function createProductButton(txt, value) {
  const btn = createElement('button', { class: "button-primary", type: 'button', 'data-price': value }, txt)
  return btn
}

export { createProductButton }