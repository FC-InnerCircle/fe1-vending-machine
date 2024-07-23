import { getBalance, initializeBalance, updateBalance, setBalance } from './balance.js';
import { scrollLogToBottom } from './log.js';

export const saveToLocalStorage = () => {
  localStorage.setItem('balance', getBalance());
  localStorage.setItem('log', document.getElementById('log').innerHTML);
};

export const loadFromLocalStorage = () => {
  const savedBalance = localStorage.getItem('balance');
  const savedLog = localStorage.getItem('log');
  if (savedBalance !== null) {
    initializeBalance(document.getElementById('balance-display'));
    setBalance(parseInt(savedBalance)); // 전역 변수 balance 초기화
    updateBalance();
  }
  if (savedLog !== null) {
    document.getElementById('log').innerHTML = savedLog;
    scrollLogToBottom();
  }
};
