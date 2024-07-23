function formatNumber(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function updateDisplay(amount, elem) {
  elem.textContent = formatNumber(amount);
}

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
export { formatNumber, updateDisplay, BalanceState };
