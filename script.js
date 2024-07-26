document.addEventListener("DOMContentLoaded", function () {
  setStorage();
  createItems();
  repayment();
  insertAmount();
});

function createItems() {
  const itemContainer = document.getElementById("item-container");

  // 아이템 block 생성
  for (let value = 300; value <= 1100; value += 100) {
    const item = document.createElement("div");
    item.id = "item";
    item.setAttribute("value", value);
    item.className =
      "p-4 text-center bg-yellow-200 hover:bg-yellow-600 active:bg-yellow-700 cursor-pointer";
    item.textContent = "FE" + value;

    // 클릭 이벤트 추가
    item.addEventListener("click", function () {
      purchaseItem.call(this);
    });

    itemContainer.appendChild(item);
  }
}

function getItemValue() {
  document.getElementById("input").value = "";
  const { value } = document.getElementById("input");

  return Number(value);
}

function insertAmount() {
  const insertBtn = document.getElementById("insert");
  const balanceDiv = document.getElementById("balance");
  const balance = Number(localStorage.getItem("balance"));

  insertBtn.addEventListener("click", function () {
    if (amountValue > 1) {
    const amountValue = getItemValue();
    if (amountValue > 0) {
      const newBalance = balance + amountValue;
      localStorage.setItem("balance", newBalance);

      balanceDiv.textContent = newBalance.toLocaleString();
      addLog(`${amountValue.toLocaleString()}원을 투입했습니다.`);
    }
  });
}

function purchaseItem() {
  const itemValue = Number(this.getAttribute("value"));
  const balance = Number(localStorage.getItem("balance"));
  const balanceDiv = document.getElementById("balance");
  const calBalance = balance - itemValue;

  if (calBalance >= 0) {
    localStorage.setItem("balance", calBalance);
    balanceDiv.textContent = calBalance.toLocaleString();

    addLog(`${this.textContent}을 구매했습니다.`);

    if (calBalance < 300 && calBalance > 1) {
      resetBalance();
      addLog("잔액이 300원미만이므로 자동잔액반환되었습니다.");
    }
  } else {
    addLog("잔액이 부족합니다.");

    if (Number(balance) === 0) {
      balanceDiv.textContent = itemValue;
      setTimeout(() => {
        balanceDiv.textContent = "0";
      }, 1000);
    }
  }
}

function setStorage() {
  const balance = localStorage.getItem("balance");

  if (!balance) {
    localStorage.setItem("balance", 0);
  }

  setValue();
}

function setValue() {
  const balance = localStorage.getItem("balance");
  const balanceDiv = document.getElementById("balance");

  balanceDiv.textContent = Number(balance).toLocaleString();
}

function repayment() {
  const repaymentBtn = document.getElementById("repayment");

  repaymentBtn.addEventListener("click", function () {
    const balance = localStorage.getItem("balance");

    if (balance > 0) {
      addLog(`${Number(balance).toLocaleString()}원을 반환합니다.`);
      resetBalance();
    }
  });
}

function resetBalance() {
  const balanceDiv = document.getElementById("balance");
  localStorage.setItem("balance", 0);
  balanceDiv.textContent = 0;
}

function addLog(logMessage) {
  const logContainer = document.getElementById("log-container");

  const logItem = document.createElement("div");
  logItem.id = "log-item";
  logItem.textContent = logMessage;
  logContainer.appendChild(logItem);
  logContainer.scrollTop = logContainer.scrollHeight;
}
