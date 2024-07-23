function formatNumber(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function updateDisplay(amount, elem) {
  elem.textContent = formatNumber(amount);
}

export { formatNumber, updateDisplay };
