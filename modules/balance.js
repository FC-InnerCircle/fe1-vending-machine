import { addLog } from './log.js';
import { saveToLocalStorage } from './storage.js';

let balance = 0;
let balanceDisplay = null;

export const initializeBalance = (displayElement) => {
  balanceDisplay = displayElement;
  updateBalance();
};

export const getBalance = () => balance;

export const setBalance = (newBalance) => {
  balance = newBalance;
  updateBalance();
};

export const updateBalance = () => {
  if (balanceDisplay) {
    balanceDisplay.innerText = balance.toLocaleString();
  }
};

export const insertMoney = (amount) => {
  balance += amount;
  updateBalance();
  addLog(`${amount.toLocaleString()}원을 투입했습니다.`);
};

export const decreaseBalance = (amount) => {
  balance -= amount;
  updateBalance();
};

export const returnMoney = () => {
  if (balance > 0) {
    addLog(`${balance.toLocaleString()}원을 반환했습니다.`);
    balance = 0;
    updateBalance();
    saveToLocalStorage();
  }
};
