import { addLog, onReturn, updateDisplay } from './src/js/utils.js';
import { BalanceState } from './src/js/state.js';
import {
  onHoverButton,
  onLeaveButton,
  onClickButton,
  onReleaseButton,
} from './src/js/eventHandler.js';
import { DEPOSIT, items } from './src/js/consts.js';

function init() {
  const display = document.querySelector('.display');
  display.textContent = BalanceState.get();
  const currentAmount = document.querySelector('.current-amount');
  currentAmount.value = null;
}

function btnRender() {
  const buttonsContainer = document.getElementById('buttons-container');
  const buttonsHTML = items
    .map((item) => {
      const price = item.slice(2);
      return `<button class="item-button" data-price="${price}">${item}</button>`;
    })
    .join('');
  buttonsContainer.innerHTML = buttonsHTML;
}

function onChangeCurrentAmount(e) {
  const currentAmount = document.querySelector('.current-amount');
  const value = e.target.value;
  value >= 0 ? (currentAmount.value = value) : (currentAmount.value = 0);
  currentAmount.value = value;
}

function onDeposit() {
  const currentAmount = document.querySelector('.current-amount');
  const amount = currentAmount.value;
  BalanceState.add(amount);
  addLog(amount, DEPOSIT);
  updateDisplay(BalanceState.get());
  currentAmount.value = null;
}

function handleButtonEvent(event) {
  const target = event.target;
  if (target.classList.contains('item-button')) {
    switch (event.type) {
      case 'mouseover':
        onHoverButton(event);
        break;
      case 'mouseout':
        onLeaveButton(event);
        break;
      case 'mousedown':
        onClickButton(event);
        break;
      case 'mouseup':
        onReleaseButton(event);
        break;
    }
  }
}

function addEvent() {
  document
    .querySelector('.current-amount')
    .addEventListener('input', onChangeCurrentAmount);
  document.querySelector('.deposit').addEventListener('click', onDeposit);
  document.querySelector('.return').addEventListener('click', onReturn);

  const buttonsContainer = document.getElementById('buttons-container');
  buttonsContainer.addEventListener('mouseover', handleButtonEvent);
  buttonsContainer.addEventListener('mouseout', handleButtonEvent);
  buttonsContainer.addEventListener('mousedown', handleButtonEvent);
  buttonsContainer.addEventListener('mouseup', handleButtonEvent);
}

function main() {
  init();
  btnRender();
  addEvent();
}

main();
