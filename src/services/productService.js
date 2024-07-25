export function createProducts(count, increment, startPrice) {
  return Array.from({ length: count }, (_, index) => {
    const price = startPrice + index * increment;
    return {
      name: `FE${price}`,
      price: price,
    };
  });
}

export function createProductButtons(products, onClick, onMouseDown, onMouseOut) {
  const productContainer = document.getElementById('productContainer');

  const gridContainer = document.createElement('div');
  gridContainer.className = 'product-grid';

  products.forEach((product) => {
    const button = document.createElement('button');
    button.className = 'product-button';
    button.innerHTML = `${product.name}`;

    button.addEventListener('click', () => onClick(product));
    button.addEventListener('mousedown', () => onMouseDown(product));
    button.addEventListener('mouseup', onMouseOut);
    button.addEventListener('mouseleave', onMouseOut);

    gridContainer.appendChild(button);
  });

  productContainer.appendChild(gridContainer);
}
