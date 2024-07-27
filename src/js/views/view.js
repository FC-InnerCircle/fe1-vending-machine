import { BTN_STYLE, ITEMS } from '../constants/contants.js';

export const initView = () => {
  const menuSection = document.querySelector('.menu');
  ITEMS.forEach((item) => {
    const itemList = document.createElement('li');
    itemList.innerHTML = `<button class="order-btn ${BTN_STYLE}" type="button">${item.name}</button>`;
    menuSection.appendChild(itemList);
  });
};

export const getViewElements = () => {
  return {
    menuSection: document.querySelector('.menu'),
    insertBtn: document.querySelector('.insert-btn'),
    returnBtn: document.querySelector('.return-btn'),
    orderBtns: document.querySelectorAll('.order-btn'),
    transactionLog: document.querySelector('.log'),
    transactionLogContainer: document.querySelector('.log-container'),
    insertCoinView: document.querySelector('.user-insert-coin'),
    totalBalanceView: document.querySelector('.balance'),
  };
};
