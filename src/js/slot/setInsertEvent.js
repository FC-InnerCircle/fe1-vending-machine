import { $, parseFormattedNumber, formatNumber } from '../utils/utils';
import { logging } from '../log/logging';

function getElements() {
  const insertButton = $('.insertCoin');
  const coinInput = $('.insertedCoin');
  const displayInput = $('.container__vendingmachine__display input');

  if (!insertButton || !coinInput || !displayInput) {
    console.error('One or more elements are not found');
    return null;
  }

  return { insertButton, coinInput, displayInput };
}

function handleInsertClick(displayInput, coinInput) {
  const currentBalance = parseFormattedNumber(displayInput.value) || 0;
  const coinValue = parseInt(coinInput.value, 10) || 0;

  if (coinValue > 0) {
    const newBalance = currentBalance + coinValue;
    displayInput.value = formatNumber(newBalance);
    logging(`${displayInput.value}원을 투입했습니다.`);
    coinInput.value = 0;
  } else {
    logging('투입 금액은 양수여야 합니다.');
  }
}

function validateCoinInput(event) {
  const value = event.target.value;
  if (!/^\d*$/.test(value)) {
    event.target.value = value.replace(/[^\d]/g, '');
  }
}

function setInsertEvent() {
  const elements = getElements();

  if (!elements) return;

  const { insertButton, coinInput, displayInput } = elements;

  insertButton.addEventListener('click', function () {
    handleInsertClick(displayInput, coinInput);
  });

  coinInput.addEventListener('input', validateCoinInput);
}

export { setInsertEvent };
