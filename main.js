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

let selectItem = '';

const BalanceState = (function () {
  let Balance = 0;
  return {
    get() {
      return Balance;
    },
    set(value) {
      Balance = value;
    },
    add(value) {
      Balance += +value;
    },
    sub(value) {
      Balance -= +value;
    },
  };
})();

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

function main() {
  init();
  btnRender();
}

main();
