function $(selector, element = document) {
  return element.querySelector(selector);
}

function init() {
  document.addEventListener('DOMContentLoaded', () => {
    bindEvents();
    const $buttonContainer = $('.vending-machine-buttons');

    createButtons($buttonContainer);
  });
}

function createButtons(target) {
  let htmlString = '';

  for (let i = 300; i <= 1100; i += 100) {
    htmlString += `
    <button class="p-2 bg-sky-200 flex-1" type="button">FE${i}</button>
    `;
  }

  target.innerHTML = htmlString;
}

function bindEvents() {
  const $priceInput = $('.price-input');
  const $insertMoneyButton = $('.insert-money-button');
  const $returnMoneyButton = $('.return-money-button');

  $priceInput.addEventListener('input', (event) => {
    const { value } = event.target;

    if (!REGEX.NUMBER.test(value)) {
      priceInput.value = '';
      return;
    }

    priceInput.value = value;
  });

  $insertMoneyButton.addEventListener('click', () => {
    const money = $priceInput.value;

    setVendingMachinePrice(money);

    $priceInput.value = null;
  });

  $returnMoneyButton.addEventListener('click', () => {
    const $vendingMachinePriceInput = $('.vending-machine-price');

    const money = $vendingMachinePriceInput.textContent;

    const htmlString = `<div>${money}원을 반환합니다.</div>`;

    $vendingMachinePriceInput.textContent = '';
    logMessage(htmlString);
  });
}

function logMessage(messageHtml) {
  const $logMessageContainer = $('.log-message-container');

  $logMessageContainer.insertAdjacentHTML('afterbegin', messageHtml);
}

function setVendingMachinePrice(price) {
  const $price = $('.vending-machine-price');

  $price.textContent = commaizeNumber(price);
}

function commaizeNumber(value) {
  return value.toLocaleString();
}

function insertMoneyToVendingMachine(money) {
  setVendingMachinePrice(money);
}

init();

const REGEX = {
  NUMBER: /^\d+$/,
};
