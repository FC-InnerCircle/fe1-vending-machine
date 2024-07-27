import { initializeBalance, insertMoney, decreaseBalance, getBalance, setBalance } from '../modules/balance.js';
import { initializeState } from '../modules/state.js';

document.body.innerHTML = `
  <div id="balance-display"></div>
`;

initializeState();

test('initializeBalance should set the initial balance.', () => {
  setBalance(0); // 잔액을 초기화
  initializeBalance();
  expect(getBalance()).toBe(0);
});

test('insertMoney should increase the balance.', () => {
  setBalance(0); // 잔액을 초기화
  insertMoney(500);
  expect(getBalance()).toBe(500);
});

test('decreaseBalance should decrease the balance.', () => {
  setBalance(500); // 잔액을 설정
  decreaseBalance(200);
  expect(getBalance()).toBe(300);
});

test('decreaseBalance should not decrease the balance if insufficient funds.', () => {
  setBalance(100); // 잔액을 설정
  decreaseBalance(200);
  expect(getBalance()).toBe(100);
});