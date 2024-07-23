import { loadFromLocalStorage, saveToLocalStorage } from './modules/storage.js';
import { initializeBalance, updateBalance, insertMoney, returnMoney } from './modules/balance.js';
import { initializeItems } from './modules/items.js';

document.addEventListener('DOMContentLoaded', () => {
  const moneyInput = document.getElementById('money-input');
  const balanceDisplay = document.getElementById('balance-display');

  initializeBalance(balanceDisplay);

  loadFromLocalStorage();
  
  initializeItems();
  
  moneyInput.addEventListener('input', function() {
    this.value = this.value.replace(/[^0-9]/g, '');
  });

  document.getElementById('insert-money').addEventListener('click', () => {
    const input = moneyInput.value;
    const amount = parseInt(input);
    if (amount > 0) {
      insertMoney(amount);
      moneyInput.value = '';
      saveToLocalStorage();
    }
  });

  document.getElementById('return-money').addEventListener('click', () => {
    returnMoney();
    saveToLocalStorage();
  });

  moneyInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      document.getElementById('insert-money').click();
    }
  });
});
