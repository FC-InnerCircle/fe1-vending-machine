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

function CheckBalance() {
  if (BalanceState.get() < items[0].slice(2)) {
    onReturn();
  }
}

export function onClickButton(e) {
  const elem = e.target;
  elem.classList.add('active');
  const itemValue = getItemValue(elem.textContent);

  if (canPurchaseItem(itemValue)) {
    processPurchase(elem.textContent, itemValue);
  } else {
    showInsufficientBalance(itemValue);
  }
}

function getItemValue(itemText) {
  return Number(itemText.slice(2));
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

function showInsufficientBalance(itemValue) {
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
