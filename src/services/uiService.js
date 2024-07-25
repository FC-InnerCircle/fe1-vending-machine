import { formatPrice } from '../utils/formatUtils.js';

export function updateTotalAmountDisplay(amount) {
  const totalAmountElement = document.querySelector('#totalAmountDisplay');
  totalAmountElement.innerText = formatPrice(amount);
}

export function setupEventListeners(onDeposit, onRefund) {
  const depositButton = document.querySelector('#depositButton');
  const refundButton = document.querySelector('#refundButton');
  const inputAmountElement = document.querySelector('#inputAmount');

  depositButton.addEventListener('click', () => {
    const inputValue = Number(inputAmountElement.value);
    onDeposit(inputValue);
    inputAmountElement.value = '';
  });

  refundButton.addEventListener('click', onRefund);
}
