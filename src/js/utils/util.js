// 돈 단위 3자리 계산 함수
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('ko-KR', {
    style: 'currency',
    currency: 'KRW',
  }).format(amount);
};

export const convertCurrency = (formattedAmount) => {
  const numericString = formattedAmount.replace(/[^\d.-]/g, '');
  return parseFloat(numericString);
};

// 로그 함수
export const addLog = (
  coin,
  action,
  transactionLog,
  transactionLogContainer,
) => {
  let actionText;

  switch (action) {
    case 'insert':
      actionText = '투입';
      break;
    case 'return':
      actionText = '반환';
      break;
    case 'buy':
      actionText = '구매';
      break;
    default:
      actionText = '';
  }

  const li = document.createElement('li');
  const logMessage = `${
    action === 'buy' ? coin : formatCurrency(coin)
  }을 ${actionText} 했습니다.`;

  li.textContent = logMessage;
  transactionLog.appendChild(li);

  // 로그 스크롤 최하단 설정
  transactionLogContainer.scrollTop = transactionLogContainer.scrollHeight;
};

// 반환 함수
export const returnMoney = (
  amount,
  totalBalanceView,
  transactionLog,
  transactionLogContainer,
) => {
  const totalBalance = convertCurrency(amount);

  if (totalBalance > 0) {
    // 반환 로그 남기기
    addLog(totalBalance, 'return', transactionLog, transactionLogContainer);
    totalBalanceView.value = formatCurrency(0);
  } else {
    alert('반환할 금액이 없습니다.');
  }
};

// 투입 함수
export const insertMoney = (
  amount,
  totalBalanceView,
  insertCoinView,
  transactionLog,
  transactionLogContainer,
) => {
  let totalBalance = convertCurrency(totalBalanceView.value);
  totalBalance += parseInt(amount, 10);
  totalBalanceView.value = formatCurrency(totalBalance);

  // 로그 남기기
  addLog(amount, 'insert', transactionLog, transactionLogContainer);

  // insert coin init
  insertCoinView.value = 0;
};

// 최솟값 구하기
export const findMinPrice = (items) => {
  if (items.length === 0) return 0;

  return Math.min(...items.map((item) => item.price));
};

// 구매 함수
export const buyItem = (
  item,
  price,
  totalBalanceView,
  items,
  transactionLog,
  transactionLogContainer,
) => {
  let totalBalance = convertCurrency(totalBalanceView.value);

  const cost = price;
  const minCost = findMinPrice(items); // 최소금액

  if (totalBalance >= cost) {
    totalBalance -= cost;

    // 구매 로그
    addLog(item, 'buy', transactionLog, transactionLogContainer);

    if (totalBalance < minCost && totalBalance > 0) {
      // 반환
      returnMoney(
        totalBalance,
        totalBalanceView,
        transactionLog,
        transactionLogContainer,
      );
    } else {
      totalBalanceView.value = formatCurrency(totalBalance);
    }
  } else {
    alert('잔액이 부족합니다.');
  }
};
