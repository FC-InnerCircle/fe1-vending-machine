document.addEventListener('DOMContentLoaded', () => {
  let balance = 0;
  const balanceDisplay = document.getElementById('balance-display');
  const logDisplay = document.getElementById('log');
  const logContainer = document.getElementById('log-container');
  const moneyInput = document.getElementById('money-input');

  moneyInput.addEventListener('input', function() {
    this.value = this.value.replace(/[^0-9]/g, '');
  });

  document.getElementById('insert-money').addEventListener('click', () => {
    const input = moneyInput.value;
    const amount = parseInt(input);
    if (amount > 0) {
      balance += amount;
      updateBalance();
      addLog(`${amount.toLocaleString()}원을 투입했습니다.`);
      moneyInput.value = '';
      saveToLocalStorage();
    }
  });

});
