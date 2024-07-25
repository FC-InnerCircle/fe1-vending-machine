import { formatPrice } from '../utils/utils.js';
import { appendLog, updateTotalAmount } from './uiService.js';

export function createProducts(count, increment, startPrice) {
  return Array.from({ length: count }, (_, index) => {
    const price = startPrice + (index * increment);
    return {
      name: `FE${price}`,
      price: price
    };
  });
}

export function createProductButtons(products) {
  const productContainer = document.getElementById('productContainer');

  const gridContainer = document.createElement('div');
  gridContainer.className = 'product-grid';

  products.forEach(product => {
    const button = document.createElement('button');
    button.className = 'product-button';
    button.innerHTML = `${product.name}<br>${formatPrice(product.price)}원`;

    button.addEventListener('click', () => handleProductPurchase(product));

    gridContainer.appendChild(button);
  });

  productContainer.appendChild(gridContainer);
}

function handleProductPurchase(product) {
  const totalAmountElement = document.querySelector('#totalAmountDisplay');
  const currentAmount = Number(totalAmountElement.innerText.replace(/,/g, ''));

  if (currentAmount >= product.price) {
    appendLog(`${product.name}을 구매했습니다.`);
    updateTotalAmount(currentAmount - product.price);
  }
}
