import { addLog } from './log.js';
import { saveToLocalStorage } from './storage.js';
import { getState } from './state.js';

let balance = 0;

export const initializeBalance = () => {
  const { balanceDisplay } = getState();
  updateBalance(balanceDisplay);
};

export const getBalance = () => balance;

export const setBalance = (newBalance) => {
  if (isValidBalance(newBalance)) {
    balance = newBalance;
    updateBalance();
  }
};

export const updateBalance = () => {
  const { balanceDisplay } = getState();
  if (balanceDisplay) {
    balanceDisplay.innerText = balance.toLocaleString();
  }
};

export const insertMoney = (amount) => {
  const { moneyInput } = getState();
  if (isValidAmount(amount)) {
    balance += amount;
    updateBalance();
    addLog(`${amount.toLocaleString()}원을 투입했습니다.`);
    if (moneyInput) {
      moneyInput.value = '';
    }
  } else {
    addLog('유효하지 않은 금액입니다.');
  }
};

export const decreaseBalance = (amount) => {
  if (isValidAmount(amount) && balance >= amount) {
    balance -= amount;
    updateBalance();
  }
};

export const returnMoney = () => {
  if (balance > 0) {
    addLog(`${balance.toLocaleString()}원을 반환했습니다.`);
    balance = 0;
    updateBalance();
    saveToLocalStorage();
  }
};

const isValidBalance = (amount) => {
  return typeof amount === 'number' && amount >= 0 && amount % 1 === 0;
};

const isValidAmount = (amount) => {
  return typeof amount === 'number' && amount > 0 && amount % 1 === 0;
};
