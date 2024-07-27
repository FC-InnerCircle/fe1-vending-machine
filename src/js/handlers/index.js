import { getViewElements } from '../views/view.js';
import {
  handleReturnButtonClick,
  handleInsertButtonClick,
  handleOrderButtonClick,
} from './eventHandlers.js';

export const initializeEventHandlers = () => {
  // 사용할 Elements 가져오기
  const { insertBtn, returnBtn, orderBtns } = getViewElements();

  insertBtn.addEventListener('click', () => handleInsertButtonClick());

  returnBtn.addEventListener('click', () => handleReturnButtonClick());

  // 주문 버튼
  orderBtns.forEach((btn) => {
    btn.addEventListener('click', (event) => handleOrderButtonClick(event));
  });
};
