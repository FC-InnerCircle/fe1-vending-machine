import { REGEX } from './constants/regex.js';
import { $ } from './utils/dom.js';
import { createButtons, logMessage, setVendingMachinePrice } from './view.js';

function init() {
  document.addEventListener('DOMContentLoaded', () => {
    const $buttonContainer = $('.vending-machine-button-container');

    createButtons($buttonContainer);

    bindEvents();
  });
}

function bindEvents() {
  const $priceInput = $('.price-input');
  const $returnMoneyButton = $('.return-money-button');
  const $vendingMachineInsertForm = $('.vending-machine-insert-form');
  const $vendingMachineButtonContainer = $('.vending-machine-button-container');
  const $vendingMachinePriceInput = $('.vending-machine-price');

  $priceInput.addEventListener('input', (event) => {
    const { value } = event.target;

    if (!REGEX.NUMBER.test(value)) {
      $priceInput.value = '';
      return;
    }
  });

  $vendingMachineInsertForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const money = $priceInput.value;

    setVendingMachinePrice(money);

    $priceInput.value = null;
  });

  $returnMoneyButton.addEventListener('click', () => {
    const money = $vendingMachinePriceInput.textContent;

    const htmlString = `<div>${money}원을 반환합니다.</div>`;

    $vendingMachinePriceInput.textContent = '';
    logMessage(htmlString);
  });

  $vendingMachineButtonContainer.addEventListener('click', (event) => {
    if (event.target.tagName !== 'BUTTON') {
      return;
    }

    const { textContent: productName } = event.target;
    const [, price] = productName.split('FE');
    const vendingMachinePrice = Number($vendingMachinePriceInput.textContent);

    if (Number(price) <= vendingMachinePrice) {
      logMessage(`<div>${productName}을 구매했습니다.</div>`);
      $vendingMachinePriceInput.textContent =
        vendingMachinePrice - Number(price);

      if (vendingMachinePrice - Number(price) < 300) {
        logMessage(`<div>${vendingMachinePrice}원을 반환합니다.</div>`);
        $vendingMachinePriceInput.textContent = '';
      }
    }
  });
}

init();
