import { ITEMS } from '../constants/contants.js';
import { returnMoney, insertMoney, buyItem } from '../utils/util.js';
import { getViewElements } from '../views/view.js';

export const handleReturnButtonClick = () => {
  const { totalBalanceView } = getViewElements();

  const totalBalance = totalBalanceView.value;
  returnMoney(totalBalance, totalBalanceView);
};

export const handleInsertButtonClick = () => {
  const { insertCoinView, totalBalanceView } = getViewElements();

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

export const handleOrderButtonClick = (event) => {
  const { totalBalanceView } = getViewElements();

  const itemName = event.target.textContent;
  const item = ITEMS.find((i) => i.name === itemName);

  if (item) {
    buyItem(item.name, item.price, totalBalanceView, ITEMS);
  }
};
