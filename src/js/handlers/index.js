import { ITEMS } from '../constants/contants.js';
import {
  handleReturnButtonClick,
  handleInsertButtonClick,
  handleOrderButtonClick,
} from './eventHandlers.js';

export const initializeEventHandlers = (
  insertBtn,
  returnBtn,
  insertCoinView,
  totalBalanceView,
  transactionLog,
  transactionLogContainer,
) => {
  insertBtn.addEventListener('click', (event) =>
    handleInsertButtonClick(
      insertCoinView,
      totalBalanceView,
      transactionLog,
      transactionLogContainer,
    ),
  );

  returnBtn.addEventListener('click', (event) =>
    handleReturnButtonClick(
      totalBalanceView,
      transactionLog,
      transactionLogContainer,
    ),
  );

  // 주문 버튼
  const orderBtns = document.querySelectorAll('.order-btn');

  orderBtns.forEach((btn) => {
    btn.addEventListener('click', (event) =>
      handleOrderButtonClick(
        event,
        ITEMS,
        totalBalanceView,
        transactionLog,
        transactionLogContainer,
      ),
    );
  });
};
