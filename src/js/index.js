import { btnStyle } from './constants/contants.js';

import { getViewElements, initView } from './views/view.js';
import { initializeEventHandlers } from './handlers/index.js';

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

// 이벤트 핸들러 초기화
initializeEventHandlers(
  insertBtn,
  returnBtn,
  insertCoinView,
  totalBalanceView,
  transactionLog,
  transactionLogContainer,
);
