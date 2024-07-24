export function appendLog(text) {
  const newLog = document.createElement('div');
  newLog.innerText = text;

  const logScreen = document.querySelector('#logScreen');
  logScreen.append(newLog);
}

function handleDeposit() {
  const inputAmountElement = document.querySelector('#inputAmount');
  const totalAmountElement = document.querySelector('#totalAmountDisplay');
  const inputValue = inputAmountElement.value;
  appendLog(`${inputValue}원을 투입했습니다.`);
  const totalAmount = Number(totalAmountElement.innerText.replace(/,/g, '')) + Number(inputValue);
  inputAmountElement.value = '';
  totalAmountElement.innerText = totalAmount.toLocaleString('ko-KR');
}

function handleRefund() {
  const totalAmountElement = document.querySelector('#totalAmountDisplay');
  const totalAmount = totalAmountElement.innerText;
  appendLog(`${totalAmount}원을 반환합니다.`);
  totalAmountElement.innerText = '0';
}

export function setupEventListeners() {
  const depositButton = document.querySelector('#depositButton');
  const refundButton = document.querySelector('#refundButton');

  depositButton.addEventListener('click', handleDeposit);
  refundButton.addEventListener('click', handleRefund);
}
