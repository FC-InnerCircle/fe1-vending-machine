import './style.css'


const inputAmountElement = document.querySelector('#inputAmount');
const depositButton = document.querySelector('#depositButton');
const totalAmountElement = document.querySelector('#totalAmountDisplay');

const appendLog = (text) => {
  const newLog = document.createElement('div');
  newLog.innerText = text;

  const logScreen = document.querySelector('#logScreen');
  logScreen.append(newLog);
}

const handleDeposit = () => {
  const inputValue = inputAmountElement.value;
  appendLog(`${inputValue}원을 투입했습니다.`);
  const totalAmount = Number(totalAmountElement.innerText) + Number(inputValue);
  inputAmountElement.value = '';
  totalAmountElement.innerText = totalAmount;
}

const handleRefund = () => {
  const totalAmount = Number(totalAmountElement.innerText);
  appendLog(`${totalAmount}원을 반환합니다.`);
  totalAmountElement.innerText = '';
}

depositButton.addEventListener('click', handleDeposit);
refundButton.addEventListener('click', handleRefund);

function createProducts(count, increment, startPrice) {
  return Array.from({ length: count }, (_, index) => {
    const price = startPrice + (index * increment);
    return {
      name: `FE${price}`,
      price: price
    };
  });
}



const products = createProducts(9, 100, 300);


function createProductButtons(products) {
  const productContainer = document.getElementById('productContainer');

  const gridContainer = document.createElement('div');
  gridContainer.className = 'product-grid';

  products.forEach(product => {
    const button = document.createElement('button');
    button.className = 'product-button';
    button.innerHTML = `${product.name}<br>${product.price}원`;

    button.addEventListener('click', () => {
      console.log(`${product.name} 선택됨, 가격: ${product.price}원`);
      // 여기에 상품 선택 로직 추가
    });

    gridContainer.appendChild(button);
  });

  productContainer.appendChild(gridContainer);
}

createProductButtons(products);
