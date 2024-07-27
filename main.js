import { loadFromLocalStorage, saveToLocalStorage } from './modules/storage.js';
import { initializeBalance, insertMoney, returnMoney } from './modules/balance.js';
import { initializeItems } from './modules/items.js';
import { initializeState, getState } from './modules/state.js';

document.addEventListener('DOMContentLoaded', () => {
  const MAX_INPUT_AMOUNT = 100000;

  initializeState(); // 상태 초기화
  const { moneyInput, insertMoneyBtn, returnMoneyBtn } = getState();

  if (!moneyInput || !insertMoneyBtn || !returnMoneyBtn) {
    console.error('One or more required elements are not found');
    return;
  }

  initializeBalance();
  loadFromLocalStorage();
  initializeItems();

  moneyInput.addEventListener('input', function() {
    if (typeof this.value !== 'string') {
      console.error('Invalid input value');
      return;
    }

    // 숫자가 아닌 문자 제거
    this.value = this.value.replace(/[^0-9]/g, '');

    const inputValue = parseInt(this.value, 10);
    
    // 입력값이 0 이하인 경우 무시
    if (isNaN(inputValue) || inputValue <= 0) {
      this.value = '';
    } else if (inputValue > MAX_INPUT_AMOUNT) {
      // 최대 값 초과 시 최대 값으로 설정
      this.value = MAX_INPUT_AMOUNT;
    }
  });

  const moneyForm = document.getElementById('money-form');
  if (!moneyForm) {
    console.error('Money form not found');
    return;
  }

  moneyForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const input = moneyInput.value;
    const amount = parseInt(input, 10);

    if (isNaN(amount) || amount <= 0) {
      console.error('Invalid amount value');
      return;
    }

    insertMoney(amount);
    moneyInput.value = '';
    saveToLocalStorage();
  });

  returnMoneyBtn.addEventListener('click', () => {
    returnMoney();
    saveToLocalStorage();
  });
});
