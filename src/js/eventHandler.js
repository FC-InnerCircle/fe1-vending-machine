import { BalanceState } from './state.js';
import { updateDisplay } from './utils.js';

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
  // case1 : balance가 있을때 금액이 깍이고 로그에 아이템이 구매했습니다 출력
  if (BalanceState.get() >= itemValue) {
    BalanceState.sub(itemValue);
    updateDisplay(BalanceState.get());
  } else {
    updateDisplay(itemValue);
  }
}

export function onReleaseButton(e) {
  const elem = e.target;
  elem.classList.remove('active');
  updateDisplay(BalanceState.get());
}
