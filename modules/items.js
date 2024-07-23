import { addLog } from './log.js';
import { saveToLocalStorage } from './storage.js';
import { getBalance, updateBalance, decreaseBalance } from './balance.js';
import { showTemporaryMessage } from './messages.js';

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

  items.forEach(item => {
    const button = document.createElement('button');
    button.className = 'p-4 bg-blue-200 rounded item hover:bg-blue-300 active:bg-blue-400';
    button.textContent = item.label;
    button.dataset.price = item.price;
    button.addEventListener('click', () => purchaseItem(item.price, item.label));
    itemsContainer.appendChild(button);
  });
};

const purchaseItem = (price, label) => {
  const balance = getBalance();
  if (balance >= price) {
    decreaseBalance(price);
    updateBalance();
    addLog(`${label}을(를) 구입했습니다.`);
    if (getBalance() < 300) {
      addLog(`${getBalance().toLocaleString()}원을 반환했습니다.`);
      decreaseBalance(getBalance());
    }
    saveToLocalStorage();
  } else {
    showTemporaryMessage(label, '잔액 부족');
  }
};
