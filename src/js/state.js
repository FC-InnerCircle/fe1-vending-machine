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

const SelectItemState = (function () {
  let selectItme = null;
  return {
    get() {
      return selectItme;
    },
    set(value) {
      selectItme = value;
    },
  };
})();

export { BalanceState, SelectItemState };
