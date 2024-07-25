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
    this.value = this.value.replace(/[^0-9]/g, '');
  
    if (parseInt(this.value, 10) > MAX_INPUT_AMOUNT) {
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
