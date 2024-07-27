import { returnMoney, insertMoney, buyItem } from '../utils/util.js';

export const handleReturnButtonClick = (totalBalanceView) => {
  const totalBalance = totalBalanceView.value;
  returnMoney(totalBalance, totalBalanceView);
};

export const handleInsertButtonClick = (insertCoinView, totalBalanceView) => {
  const coin = insertCoinView.value;

  if (coin > 0) {
    insertMoney(coin, totalBalanceView, insertCoinView);
  } else {
    if (coin < 0) {
      alert('음수는 투입할 수 없습니다.');
    }
    insertCoinView.value = 0;
  }
};

export const handleOrderButtonClick = (event, items, totalBalanceView) => {
  const itemName = event.target.textContent;
  const item = items.find((i) => i.name === itemName);

  if (item) {
    buyItem(item.name, item.price, totalBalanceView, items);
  }
};
