document.addEventListener('DOMContentLoaded', () => {
  let balance = 0;
  const balanceDisplay = document.getElementById('balance-display');
  const logDisplay = document.getElementById('log');
  const logContainer = document.getElementById('log-container');
  const moneyInput = document.getElementById('money-input');

  // 로컬 스토리지에서 데이터를 불러오기
  loadFromLocalStorage();

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

  document.getElementById('return-money').addEventListener('click', () => {
    if (balance > 0) {
      addLog(`${balance.toLocaleString()}원을 반환했습니다.`);
      balance = 0;
      updateBalance();
      saveToLocalStorage();
    }
  });

  document.querySelectorAll('.item').forEach(button => {
    button.addEventListener('click', () => {
      const price = parseInt(button.getAttribute('data-price'));
      if (balance >= price) {
        balance -= price;
        updateBalance();
        addLog(`${button.innerText}을(를) 구입했습니다.`);
        if (balance < 300) {
          addLog(`${balance.toLocaleString()}원을 반환했습니다.`);
          balance = 0;
          updateBalance();
        }
        saveToLocalStorage();
      } else {
        showTemporaryMessage(button, '잔액 부족');
      }
    });
  });

  moneyInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      document.getElementById('insert-money').click();
    }
  });

  function updateBalance() {
    balanceDisplay.innerText = balance.toLocaleString();
  }

  function addLog(message) {
    const logEntry = document.createElement('div');
    logEntry.textContent = message;
    logDisplay.appendChild(logEntry);
    scrollLogToBottom();
  }

  function showTemporaryMessage(element, message) {
    const originalText = element.innerText;
    element.innerText = message;
    setTimeout(() => {
      element.innerText = originalText;
    }, 1000);
  }

  function saveToLocalStorage() {
    localStorage.setItem('balance', balance);
    localStorage.setItem('log', logDisplay.innerHTML);
  }

  function loadFromLocalStorage() {
    const savedBalance = localStorage.getItem('balance');
    const savedLog = localStorage.getItem('log');
    if (savedBalance !== null) {
      balance = parseInt(savedBalance);
      updateBalance();
    }
    if (savedLog !== null) {
      logDisplay.innerHTML = savedLog;
      scrollLogToBottom();
    }
  }

  function scrollLogToBottom() {
    logContainer.scrollTop = logContainer.scrollHeight;
  }
});

