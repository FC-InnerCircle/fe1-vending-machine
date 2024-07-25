import Items from './contants.js';

import {
  handleReturnButtonClick,
  handleInsertButtonClick,
  handleOrderButtonClick,
} from './eventHandlers.js';

const menuSection = document.querySelector('.menu');
const insertBtn = document.querySelector('.insert-btn');
const returnBtn = document.querySelector('.return-btn');
const transactionLog = document.querySelector('.log');
const transactionLogContainer = document.querySelector('.log-container');

// view
const insertCoinView = document.querySelector('.user-insert-coin');
const totalBalanceView = document.querySelector('.balance');

const btnStyle =
  'flex items-center justify-center w-32 h-20 bg-blue-300 hover:bg-blue-400 active:bg-blue-500 text-white font-bold rounded shadow-md transition-all duration-200';

// 렌더링
Items.forEach((item) => {
  const itemList = document.createElement('li');
  itemList.innerHTML = `<button class="order-btn ${btnStyle}" type="button">${item.name}</button>`;

  menuSection.appendChild(itemList);
});

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
