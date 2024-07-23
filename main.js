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
let Balance = 0;

function init() {
  const display = document.querySelector('.display');
  display.textContent = Balance;
  const currentAmount = document.querySelector('.current-amount');
  currentAmount.value = 0;
}

function btnRender() {
  const buttonsContainer = document.getElementById('buttons-container');
  items.forEach((item) => {
    const button = document.createElement('button');
    button.textContent = item;
    button.classList.add('item-button');

    function onClickButton(e) {
      const elem = e.target;
      elem.classList.add('active');
      setTimeout(() => {
        elem.classList.remove('active');
      }, 1000);
    }

    button.addEventListener('mousedown', onClickButton);

    buttonsContainer.appendChild(button);
  });
}

function main() {
  init();
  btnRender();
}

main();
