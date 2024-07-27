import { addLog } from './log.js';
import { saveToLocalStorage } from './storage.js';
import { getBalance, decreaseBalance, setBalance } from './balance.js';
import { showTemporaryMessage } from './messages.js';
import { getState } from './state.js';

const ITEMS = [
  { label: 'FE300', price: 300 },
  { label: 'FE400', price: 400 },
  { label: 'FE500', price: 500 },
  { label: 'FE600', price: 600 },
  { label: 'FE700', price: 700 },
  { label: 'FE800', price: 800 },
  { label: 'FE900', price: 900 },
  { label: 'FE1000', price: 1000 },
  { label: 'FE1100', price: 1100 },
];


export const initializeItems = () => {
  const { itemsContainer } = getState();

  ITEMS.forEach(item => {
    const button = document.createElement('button');
    button.className = 'p-4 bg-blue-200 rounded item hover:bg-blue-300 active:bg-blue-400';
    button.textContent = item.label;
    button.dataset.price = item.price;

    itemsContainer.appendChild(button);
  });

  itemsContainer.addEventListener('click', (event) => {
    const button = event.target.closest('button.item');
    if (button) {
      const price = parseInt(button.dataset.price, 10);
      const label = button.textContent;
      purchaseItem(price, label);
    }
  });

  itemsContainer.addEventListener('mousedown', (event) => {
    const button = event.target.closest('button.item');
    if (button) {
      const price = parseInt(button.dataset.price, 10);
      displayTemporaryPrice(price);
    }
  });

  itemsContainer.addEventListener('mouseup', (event) => {
    const button = event.target.closest('button.item');
    if (button) {
      restoreBalance();
    }
  });
};

const purchaseItem = (price, label) => {
  const balance = getBalance();
  if (balance >= price) {
    completePurchase(price, label);
  } else {
    notifyInsufficientBalance(label);
  }
};

const completePurchase = (price, label) => {
  decreaseBalance(price);
  addLog(`${label}을(를) 구입했습니다.`);
  if (getBalance() < getMinPrice()) {
    returnRemainingBalance();
  }
  saveToLocalStorage();
};

const notifyInsufficientBalance = (label) => {
  const message = '잔액 부족';
  addLog(message);
  showTemporaryMessage(label, message);
};

const returnRemainingBalance = () => {
  addLog(`${getBalance().toLocaleString()}원을 반환했습니다.`);
  decreaseBalance(getBalance());
};

const getMinPrice = () => Math.min(...ITEMS.map(item => item.price));

let originalBalance = null;

const displayTemporaryPrice = (price) => {
  originalBalance = getBalance();
  setBalance(price);
};

const restoreBalance = () => {
  if (originalBalance !== null) {
    setBalance(originalBalance);
    originalBalance = null;
  }
};
