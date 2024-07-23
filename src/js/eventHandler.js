export function onDeposit() {
  const currentAmount = document.querySelector('.current-amount');
  const amount = Number(currentAmount.value);
  const display = document.querySelector('.display');
  Balance += amount;
  display.textContent = Balance;
  currentAmount.value = 0;
}

export function onChangeCurrentAmount(e) {
  const currentAmount = document.querySelector('.current-amount');
  const value = e.target.value;
  value >= 0 ? (currentAmount.value = value) : (currentAmount.value = 0);
  currentAmount.value = value;
}

export function onClickButton(e) {
  const elem = e.target;
  elem.classList.add('active');
  setTimeout(() => {
    elem.classList.remove('active');
  }, 1000);
}
