import { saveToLocalStorage, loadFromLocalStorage } from '../modules/storage.js';
import { setBalance, getBalance } from '../modules/balance.js';
import { addLog } from '../modules/log.js';
import { initializeState } from '../modules/state.js';

document.body.innerHTML = `
  <div id="balance-display"></div>
  <ul id="log-display"></ul>
`;

initializeState();

test('saveToLocalStorage should save balance and logs', () => {
  setBalance(500);
  addLog('Test log message');
  saveToLocalStorage();

  expect(localStorage.getItem('balance')).toBe('500');
  expect(localStorage.getItem('log')).toBe(JSON.stringify(['Test log message']));
});

test('loadFromLocalStorage should load balance and logs', () => {
  localStorage.setItem('balance', '500');
  localStorage.setItem('log', JSON.stringify(['Test log message']));

  loadFromLocalStorage();

  expect(getBalance()).toBe(500);

  const logDisplay = document.getElementById('log-display');
  expect(logDisplay.children.length).toBe(2);
  expect(logDisplay.children[0].textContent).toBe('Test log message');
  expect(logDisplay.children[1].textContent).toBe('Test log message');
});