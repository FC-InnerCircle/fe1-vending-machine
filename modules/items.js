import { addLog } from './log.js';
import { saveToLocalStorage } from './storage.js';
import { getBalance, setBalance, updateBalance, decreaseBalance } from './balance.js';
import { showTemporaryMessage } from './messages.js';

const TEMP_DISPLAY_TIME = 800;
let minPrice = 0;

export const initializeItems = () => {
  const items = [
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

  const itemsContainer = document.getElementById('items-container');
  if (!itemsContainer) {
    console.error('Items container not found');
    return;
  }

  minPrice = Math.min(...items.map(item => item.price));

  items.forEach(item => {
    const button = document.createElement('button');
    button.className = 'p-4 bg-blue-200 rounded item hover:bg-blue-300 active:bg-blue-400';
    button.textContent = item.label;
    button.dataset.price = item.price;

    button.addEventListener('click', () => purchaseItem(item.price, item.label));
    itemsContainer.appendChild(button);
  });
};

export const purchaseItem = (price, label) => {
  const balance = getBalance();

  if (balance >= price) {
    completePurchase(price, label);
  } else {
    displayTemporaryPrice(price);
    notifyInsufficientBalance(label);
  }
};

const completePurchase = (price, label) => {
  decreaseBalance(price);
  updateBalance();
  addLog(`${label}을(를) 구입했습니다.`);

  if (getBalance() < minPrice) {
    returnRemainingBalance();
  }

  saveToLocalStorage();
};

const displayTemporaryPrice = (price) => {
  const currentBalance = getBalance();
  setBalance(price);

  setTimeout(() => {
    setBalance(currentBalance);
    updateBalance();
  }, TEMP_DISPLAY_TIME);
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