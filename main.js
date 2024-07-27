import './styles/reset.css';
import './styles/style.css';

import { createProducts, createProductButtons } from './src/services/productService.js';
import { setupEventListeners, updateTotalAmountDisplay } from './src/services/uiService.js';
import { INITIAL_TOTAL_AMOUNT, MIN_PRODUCT_PRICE } from './src/constants.js';
import { formatPrice } from './src/utils/formatUtils.js';

let globalTotalAmount = INITIAL_TOTAL_AMOUNT;
let temporaryUpdateTimeout = null;

const products = createProducts(9, 100, MIN_PRODUCT_PRICE);
const productGrid = createProductButtons(products);

productGrid.addEventListener('click', handleProductClick);
productGrid.addEventListener('mousedown', handleProductMouseDown);
productGrid.addEventListener('mouseup', handleProductMouseOut);
productGrid.addEventListener('mouseleave', handleProductMouseOut);

setupEventListeners(handleDeposit, handleRefund);
updateTotalAmountDisplay(globalTotalAmount);

function handleProductClick(event) {
  if (event.target.classList.contains('product-button')) {
    const product = {
      name: event.target.dataset.name,
      price: parseInt(event.target.dataset.price),
    };
    handleProductPurchase(product);
  }
}

function handleProductMouseDown(event) {
  if (event.target.classList.contains('product-button')) {
    const product = {
      price: parseInt(event.target.dataset.price),
    };
    if (globalTotalAmount < product.price) {
      updateTotalAmountDisplay(product.price);
    }
  }
}

function handleProductMouseOut(event) {
  updateTotalAmountDisplay(globalTotalAmount);
}

function handleProductPurchase(product) {
  if (temporaryUpdateTimeout !== null) {
    clearTimeout(temporaryUpdateTimeout);
    temporaryUpdateTimeout = null;
  }

  if (globalTotalAmount >= product.price) {
    appendLog(`${product.name}을 구매했습니다.`);
    globalTotalAmount -= product.price;

    if (globalTotalAmount === 0 || globalTotalAmount >= MIN_PRODUCT_PRICE) {
      updateTotalAmountDisplay(globalTotalAmount);
      return;
    }

    handleRefund();
  } else {
    const prevTotalAmount = globalTotalAmount;
    updateTotalAmountDisplay(product.price);

    temporaryUpdateTimeout = setTimeout(() => {
      updateTotalAmountDisplay(prevTotalAmount);
      temporaryUpdateTimeout = null;
    }, 500);
  }
}

function handleDeposit(inputValue) {
  if (inputValue <= 0) {
    return;
  }

  appendLog(`${formatPrice(inputValue)}원을 투입했습니다.`);
  globalTotalAmount += inputValue;
  updateTotalAmountDisplay(globalTotalAmount);
}

function handleRefund() {
  const totalAmount = formatPrice(globalTotalAmount);
  appendLog(`${totalAmount}원을 반환합니다.`);
  globalTotalAmount = 0;
  updateTotalAmountDisplay(globalTotalAmount);
}

function appendLog(text) {
  const newLog = document.createElement('div');
  newLog.innerText = text;

  const logScreen = document.querySelector('#logScreen');
  logScreen.append(newLog);

  logScreen.scrollTop = logScreen.scrollHeight;
}
