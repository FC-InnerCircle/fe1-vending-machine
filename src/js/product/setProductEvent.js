import { $, parseFormattedNumber, formatNumber } from '../utils/utils.js';
import { logging } from '../log/logging.js';
import { buy } from './buy.js';
import { getMinProductPrice } from '../utils/constants.js';

function setProductEvent() {
  document.addEventListener('DOMContentLoaded', () => {
    const buttonContainer = $('.container__vendingmachine__buttons');
    const display = $('.container__vendingmachine__display input');

    buttonContainer.addEventListener('click', function (event) {
      if (event.target.classList.contains('button-primary')) {
        const productPrice = event.target.dataset.price;
        const { result } = buy(productPrice);
        if (result === 'success') {
          logging(`${event.target.textContent}을 구매했습니다.`);
          checkMinBalance(display);
        }
      }
    });
  });
}

function checkMinBalance(display) {
  const balance = parseFormattedNumber(display.value);
  const minProductPrice = getMinProductPrice();

  if (balance < minProductPrice) {
    returnBalance(display);
  }
}

function returnBalance(display) {
  const balance = parseFormattedNumber(display.value);
  display.value = 0;
  logging(`잔액 ${formatNumber(balance)}원이 반환되었습니다.`);
}

export { setProductEvent };
