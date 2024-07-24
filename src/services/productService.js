import { formatPrice } from '../utils/utils.js';

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

    button.addEventListener('click', () => {
      console.log(`${product.name} 선택됨, 가격: ${formatPrice(product.price)}원`);
    });

    gridContainer.appendChild(button);
  });

  productContainer.appendChild(gridContainer);
}
