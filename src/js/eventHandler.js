import { BalanceState } from './state.js';
import { addLog, updateDisplay } from './utils.js';

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
  const itemValue = Number(elem.textContent.slice(2));
  if (BalanceState.get() >= itemValue) {
    BalanceState.sub(itemValue);
    updateDisplay(BalanceState.get());
    addLog(itemValue, 'buy');
  } else {
    updateDisplay(itemValue);
  }
}

export function onReleaseButton(e) {
  const elem = e.target;
  elem.classList.remove('active');
  updateDisplay(BalanceState.get());
}
