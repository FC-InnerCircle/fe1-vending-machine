import { BalanceState } from './state.js';

function formatNumber(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function updateDisplay(amount) {
  const display = document.querySelector('.display');
  display.textContent = formatNumber(amount);
}

function addLog(value, type) {
  if (value == 0) return;
  let content = '';
  switch (type) {
    case 'deposit':
      content = `${formatNumber(value)}을 투입했습니다.`;
      break;
    case 'return':
      content = `${formatNumber(value)}을 반환합니다.`;
      break;
    case 'buy':
      content = `${value}을 구매했습니다.`;
      break;
  }
  const messageBox = document.querySelector('.message-box');
  const log = document.createElement('p');
  log.textContent = content;
  messageBox.appendChild(log);
  messageBox.scrollTop = messageBox.scrollHeight;
}

function onReturn() {
  addLog(BalanceState.get(), 'return');
  BalanceState.set(0);
  updateDisplay(0);
}

export { formatNumber, updateDisplay, addLog, onReturn };
