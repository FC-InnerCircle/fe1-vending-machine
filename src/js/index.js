import { BTN_STYLE } from './constants/contants.js';

import { getViewElements, initView } from './views/view.js';
import { initializeEventHandlers } from './handlers/index.js';

// 사용할 Elements 가져오기
const {
  menuSection,
  insertBtn,
  returnBtn,

  insertCoinView,
  totalBalanceView,
} = getViewElements();

// view 초기화
initView(menuSection, BTN_STYLE);

// 이벤트 핸들러 초기화
initializeEventHandlers(insertBtn, returnBtn, insertCoinView, totalBalanceView);
