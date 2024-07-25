import { formatPrice } from '../utils/utils.js';

export function appendLog(text) {
  const newLog = document.createElement('div');
  newLog.innerText = text;

  const logScreen = document.querySelector('#logScreen');
  logScreen.append(newLog);
}

export function updateTotalAmount(amount) {
  const totalAmountElement = document.querySelector('#totalAmountDisplay');
  totalAmountElement.innerText = formatPrice(amount);
}

function handleDeposit() {
  const inputAmountElement = document.querySelector('#inputAmount');
  const totalAmountElement = document.querySelector('#totalAmountDisplay');
  const inputValue = Number(inputAmountElement.value);

  appendLog(`${formatPrice(inputValue)}원을 투입했습니다.`);
  const currentAmount = Number(totalAmountElement.innerText.replace(/,/g, ''));
  updateTotalAmount(currentAmount + inputValue);
  inputAmountElement.value = '';
}

function handleRefund() {
  const totalAmountElement = document.querySelector('#totalAmountDisplay');
  const totalAmount = totalAmountElement.innerText;
  appendLog(`${totalAmount}원을 반환합니다.`);
  updateTotalAmount(0);
}

export function setupEventListeners() {
  const depositButton = document.querySelector('#depositButton');
  const refundButton = document.querySelector('#refundButton');

  depositButton.addEventListener('click', handleDeposit);
  refundButton.addEventListener('click', handleRefund);
}
