import { Items } from './contants.js';

export const initView = (menuSection, btnStyle) => {
  Items.forEach((item) => {
    const itemList = document.createElement('li');
    itemList.innerHTML = `<button class="order-btn ${btnStyle}" type="button">${item.name}</button>`;

    menuSection.appendChild(itemList);
  });
};

export const getViewElements = () => {
  return {
    menuSection: document.querySelector('.menu'),
    insertBtn: document.querySelector('.insert-btn'),
    returnBtn: document.querySelector('.return-btn'),
    transactionLog: document.querySelector('.log'),
    transactionLogContainer: document.querySelector('.log-container'),
    insertCoinView: document.querySelector('.user-insert-coin'),
    totalBalanceView: document.querySelector('.balance'),
  };
};
