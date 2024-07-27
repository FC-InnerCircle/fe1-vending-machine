import { $, parseFormattedNumber, formatNumber } from '../utils/utils.js';

function buy(value) {
  try {
    const display = getDisplayElement();
    if (!display) {
      return { result: 'fail', message: 'Display not found' };
    }

    const { balance, itemCost } = getBalanceAndItemCost(display, value);
    return attemptPurchase(balance, itemCost, display);

  } catch (error) {
    return { result: 'fail', message: error.message };
  }
}

function getDisplayElement() {
  return $('.display');
}

function getBalanceAndItemCost(display, value) {
  const balance = parseFormattedNumber(display.value);
  const itemCost = parseInt(value, 10);

  if (isNaN(balance) || isNaN(itemCost)) {
    throw new Error('Invalid balance or item cost');
  }

  return { balance, itemCost };
}

function attemptPurchase(balance, itemCost, display) {
  if (balance >= itemCost) {
    const newBalance = balance - itemCost;
    display.value = formatNumber(newBalance);
    return { result: 'success' };
  } else {
    return { result: 'fail', message: 'Insufficient balance' };
  }
}

export { buy };
