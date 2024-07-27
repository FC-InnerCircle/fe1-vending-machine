import { BUY, MINIMUM_BALANCE, items } from './consts.js';
import { BalanceState } from './state.js';
import { addLog, onReturn, updateDisplay } from './utils.js';

export function onHoverButton(e) {
  const elem = e.target;
  elem.classList.add('hover');
}

export function onLeaveButton(e) {
  const elem = e.target;
  elem.classList.remove('hover');
}

export function onClickButton(e) {
  const elem = e.target;
  elem.classList.add('active');
  const itemValue = elem.dataset.price;

  if (canPurchaseItem(itemValue)) {
    processPurchase(elem.textContent, itemValue);
  } else {
    showItemPrice(itemValue);
  }
}

function canPurchaseItem(itemValue) {
  return BalanceState.get() >= itemValue;
}

function processPurchase(itemText, itemValue) {
  BalanceState.sub(itemValue);
  updateDisplay(BalanceState.get());
  addLog(itemText, BUY);
  checkMinimumBalance();
}

function showItemPrice(itemValue) {
  updateDisplay(itemValue);
}

function checkMinimumBalance() {
  if (BalanceState.get() < MINIMUM_BALANCE) {
    onReturn();
  }
}

export function onReleaseButton(e) {
  const elem = e.target;
  elem.classList.remove('active');
  updateDisplay(BalanceState.get());
}
