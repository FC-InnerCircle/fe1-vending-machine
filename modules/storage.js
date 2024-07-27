import { getBalance, setBalance, updateBalance } from './balance.js';
import { addLog, scrollLogToBottom } from './log.js';
import { getState } from './state.js';

export const saveToLocalStorage = () => {
  localStorage.setItem('balance', getBalance());
  
  const { logDisplay } = getState();
  if (logDisplay) {
    const logs = Array.from(logDisplay.children).map(logItem => logItem.textContent);
    localStorage.setItem('log', JSON.stringify(logs));
  }
};

export const loadFromLocalStorage = () => {
  const savedBalance = localStorage.getItem('balance');
  const savedLog = localStorage.getItem('log');
  
  if (savedBalance !== null) {
    setBalance(parseInt(savedBalance));
    updateBalance();
  }

  if (savedLog !== null) {
    const { logDisplay } = getState();
    if (logDisplay) {
      const logs = JSON.parse(savedLog);
      logs.forEach(log => addLog(log));
      scrollLogToBottom();
    }
  }
};
