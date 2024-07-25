import './styles/style.css'
import { createProducts, createProductButtons } from './src/services/productService.js';
import { setupEventListeners, updateTotalAmount } from './src/services/uiService.js';
import { INITIAL_TOTAL_AMOUNT } from './src/constants.js'
import { formatPrice } from './src/utils/formatUtils.js'


let globalTotalAmount = INITIAL_TOTAL_AMOUNT;

const products = createProducts(9, 100, 300);
createProductButtons(products, handleProductPurchase);
setupEventListeners(handleDeposit, handleRefund);

updateTotalAmount(globalTotalAmount);

function handleProductPurchase(product) {
  if (globalTotalAmount >= product.price) {
    appendLog(`${product.name}을 구매했습니다.`);
    globalTotalAmount -= product.price;
    updateTotalAmount(globalTotalAmount);
  }
}


function handleDeposit(inputValue) {
  if (inputValue <= 0) {
    return;
  }

  appendLog(`${formatPrice(inputValue)}원을 투입했습니다.`);
  globalTotalAmount += inputValue;
  updateTotalAmount(globalTotalAmount);
}

function handleRefund() {
  const totalAmount = formatPrice(globalTotalAmount);
  appendLog(`${totalAmount}원을 반환합니다.`);
  globalTotalAmount = 0;
  updateTotalAmount(globalTotalAmount);
}

function appendLog(text) {
  const newLog = document.createElement('div');
  newLog.innerText = text;

  const logScreen = document.querySelector('#logScreen');
  logScreen.append(newLog);
}
