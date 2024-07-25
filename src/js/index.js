import { btnStyle, Items } from './contants.js';

import {
  handleReturnButtonClick,
  handleInsertButtonClick,
  handleOrderButtonClick,
} from './eventHandlers.js';
import { getViewElements, initView } from './view.js';

// 사용할 Elements 가져오기
const {
  menuSection,
  insertBtn,
  returnBtn,
  transactionLog,
  transactionLogContainer,
  insertCoinView,
  totalBalanceView,
} = getViewElements();

// view 초기화
initView(menuSection, btnStyle);

// 이벤트 핸들러 연결
insertBtn.addEventListener('click', (event) =>
  handleInsertButtonClick(
    event,
    insertCoinView,
    totalBalanceView,
    transactionLog,
    transactionLogContainer,
  ),
);
returnBtn.addEventListener('click', (event) =>
  handleReturnButtonClick(
    event,
    totalBalanceView,
    transactionLog,
    transactionLogContainer,
  ),
);

// 버튼 전체 order
const orderBtns = document.querySelectorAll('.order-btn');

orderBtns.forEach((btn) => {
  btn.addEventListener('click', (event) =>
    handleOrderButtonClick(
      event,
      Items,
      totalBalanceView,
      transactionLog,
      transactionLogContainer,
    ),
  );
});
