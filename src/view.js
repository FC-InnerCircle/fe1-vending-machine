import { commaizeNumber } from './utils/commaizeNumber.js';

export function createVendingMachineButtons(target) {
  let htmlString = '';

  for (let i = 300; i <= 1100; i += 100) {
    htmlString += `
    <button class="p-2 bg-sky-200 flex-1 hover:bg-sky-400 active:bg-sky-800" type="button">FE${i}</button>
    `;
  }

  target.innerHTML = htmlString;
}

export function setVendingMachinePrice(price) {
  const $price = $('.vending-machine-price');

  $price.textContent = commaizeNumber(price);
}

export function logMessage(messageHtml) {
  const $logMessageContainer = $('.log-message-container');

  $logMessageContainer.insertAdjacentHTML('afterbegin', messageHtml);
}
