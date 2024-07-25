import { returnMoney, insertMoney, buyItem } from '../utils/util.js';

export const handleReturnButtonClick = (
  event,
  totalBalanceView,
  transactionLog,
  transactionLogContainer,
) => {
  event.preventDefault();

  const totalBalance = totalBalanceView.value;
  returnMoney(
    totalBalance,
    totalBalanceView,
    transactionLog,
    transactionLogContainer,
  );
};

export const handleInsertButtonClick = (
  event,
  insertCoinView,
  totalBalanceView,
  transactionLog,
  transactionLogContainer,
) => {
  event.preventDefault();
  const coin = insertCoinView.value;

  if (coin > 0) {
    insertMoney(
      coin,
      totalBalanceView,
      insertCoinView,
      transactionLog,
      transactionLogContainer,
    );
  } else {
    if (coin < 0) {
      alert('음수는 투입할 수 없습니다.');
    }
    insertCoinView.value = 0;
  }
};

export const handleOrderButtonClick = (
  event,
  Items,
  totalBalanceView,
  transactionLog,
  transactionLogContainer,
) => {
  event.preventDefault();

  const itemName = event.target.textContent;
  const item = Items.find((i) => i.name === itemName);

  if (item) {
    buyItem(
      item.name,
      item.price,
      totalBalanceView,
      Items,
      transactionLog,
      transactionLogContainer,
    );
  }
};
