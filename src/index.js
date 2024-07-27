const REGEX = {
  NUMBER: /^\d+$/,
};

function $(selector, element = document) {
  return element.querySelector(selector);
}

function init() {
  document.addEventListener('DOMContentLoaded', () => {
    const $buttonContainer = $('.vending-machine-button-container');

    createButtons($buttonContainer);

    bindEvents();
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
  const $vendingMachineButtonContainer = $('.vending-machine-button-container');
  const $vendingMachinePriceInput = $('.vending-machine-price');

  $priceInput.addEventListener('input', (event) => {
    const { value } = event.target;

    if (!REGEX.NUMBER.test(value)) {
      $priceInput.value = '';
      return;
    }
  });

  $insertMoneyButton.addEventListener('click', () => {
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
