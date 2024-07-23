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

function main() {
  init();
}

main();
