const state = {
  itemsContainer: null,
  balanceDisplay: null,
  logDisplay: null,
  logContainer: null,
  moneyInput: null,
  insertMoneyBtn: null,
  returnMoneyBtn: null,
};

export const initializeState = () => {
  state.itemsContainer = document.getElementById('items-container');
  state.balanceDisplay = document.getElementById('balance-display');
  state.logDisplay = document.getElementById('log-display');
  state.logContainer = document.getElementById('log-container');
  state.moneyInput = document.getElementById('money-input');
  state.insertMoneyBtn = document.getElementById('insert-money');
  state.returnMoneyBtn = document.getElementById('return-money');
};

export const getState = () => state;
