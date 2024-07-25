import { loadFromLocalStorage, saveToLocalStorage } from './modules/storage.js';
import { initializeBalance, updateBalance, insertMoney, returnMoney } from './modules/balance.js';
import { initializeItems } from './modules/items.js';

document.addEventListener('DOMContentLoaded', () => {
  const MAX_INPUT_AMOUNT = 100000;

  const moneyInput = document.getElementById('money-input');
  const balanceDisplay = document.getElementById('balance-display');
  const insertMoneyBtn = document.getElementById('insert-money');
  const returnMoneyBtn = document.getElementById('return-money');

  initializeBalance(balanceDisplay);
  loadFromLocalStorage();
  initializeItems();
  
  moneyInput.addEventListener('input', function() {
  // 숫자가 아닌 문자 제거
  this.value = this.value.replace(/[^0-9]/g, '');

  // 입력값이 0 이하인 경우 무시
  if (parseInt(this.value, 10) <= 0) {
    this.value = '';
  } else if (parseInt(this.value, 10) > MAX_INPUT_AMOUNT) {
    // 최대 값 초과 시 최대 값으로 설정
    this.value = MAX_INPUT_AMOUNT;
  }
  });

  moneyInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      document.getElementById('insert-money').click();
    }
  });

  insertMoneyBtn.addEventListener('click', () => {
    const input = moneyInput.value;
    const amount = parseInt(input);
    if (amount > 0) {
      insertMoney(amount);
      moneyInput.value = '';
      saveToLocalStorage();
    }
  });

  returnMoneyBtn.addEventListener('click', () => {
    returnMoney();
    saveToLocalStorage();
  });
});
