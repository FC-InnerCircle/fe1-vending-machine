import { formatNumber, updateDisplay } from './src/js/utils.js';
import { BalanceState } from './src/js/state.js';

const items = [
  'FE300',
  'FE400',
  'FE500',
  'FE600',
  'FE700',
  'FE800',
  'FE900',
  'FE1000',
  'FE1100',
];

function init() {
  const display = document.querySelector('.display');
  display.textContent = BalanceState.get();
  const currentAmount = document.querySelector('.current-amount');
  currentAmount.value = 0;
}

function onClickButton(e) {
  const elem = e.target;
  elem.classList.add('active');
  setTimeout(() => {
    elem.classList.remove('active');
  }, 1000);
}

function btnRender() {
  const buttonsContainer = document.getElementById('buttons-container');
  items.forEach((item) => {
    const button = document.createElement('button');
    button.textContent = item;
    button.classList.add('item-button');

    button.addEventListener('mousedown', onClickButton);

    buttonsContainer.appendChild(button);
  });
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
  const display = document.querySelector('.display');
  BalanceState.add(amount);
  updateDisplay(BalanceState.get(), display);
  currentAmount.value = 0;
}

function onReturn() {
  const display = document.querySelector('.display');
  updateDisplay(0, display);
  // Todo : 로그 남기기 이벤트
}

function addEvent() {
  document
    .querySelector('.current-amount')
    .addEventListener('input', onChangeCurrentAmount);
  document.querySelector('.deposit').addEventListener('click', onDeposit);
  document.querySelector('.return').addEventListener('click', onReturn);
}

function main() {
  init();
  btnRender();
  addEvent();
}

main();