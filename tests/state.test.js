import { initializeState, getState } from '../modules/state.js';

document.body.innerHTML = `
  <div id="items-container"></div>
  <div id="balance-display"></div>
  <ul id="log-display"></ul>
  <div id="log-container"></div>
  <input id="money-input" />
  <button id="insert-money"></button>
  <button id="return-money"></button>
`;

test('initializeState should set all state elements', () => {
  initializeState();
  const state = getState();
  
  expect(state.itemsContainer).not.toBeNull();
  expect(state.balanceDisplay).not.toBeNull();
  expect(state.logDisplay).not.toBeNull();
  expect(state.logContainer).not.toBeNull();
  expect(state.moneyInput).not.toBeNull();
  expect(state.insertMoneyBtn).not.toBeNull();
  expect(state.returnMoneyBtn).not.toBeNull();
});
