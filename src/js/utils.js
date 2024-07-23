function formatNumber(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function updateDisplay(amount) {
  const display = document.querySelector('.display');
  display.textContent = formatNumber(amount);
}

function addLog(value, type) {
  const messageBox = document.querySelector('.message-box');
  const log = document.createElement('p');
  let content = '';
  switch (type) {
    case 'deposit':
      content = `${formatNumber(value)}을 투입했습니다.`;
      break;
    case 'return':
      content = `${formatNumber(value)}을 반환합니다.`;
      break;
    case 'buy':
      content = `${formatNumber(value)}을 구매했습니다.`;
      break;
  }
  log.textContent = content;
  messageBox.appendChild(log);
  messageBox.scrollTop = messageBox.scrollHeight;
}

export { formatNumber, updateDisplay, addLog };
