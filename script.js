document.addEventListener("DOMContentLoaded", function () {
  setStorage();
  createItems();
  repayment();
  insertAmount();
});

/**
 * @desc item html 생성
 */
function createItems() {
  let itemContainer = document.getElementById("item-container");

  // 아이템 block 생성
  for (let value = 300; value <= 1100; value += 100) {
    let item = document.createElement("div");
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
  let { value } = document.getElementById("input");
  document.getElementById("input").value = "";

  return Number(value);
}

function insertAmount() {
  let insertBtn = document.getElementById("insert");
  let balanceDiv = document.getElementById("balance");

  insertBtn.addEventListener("click", function () {
    let amountValue = getItemValue();
    if (amountValue > 1) {
      let balance =
        Number(localStorage.getItem("balance")) + Number(amountValue);
      localStorage.setItem("balance", balance);
      balanceDiv.textContent = balance.toLocaleString();
      addLog(`${amountValue.toLocaleString()}원을 투입했습니다.`);
    }
  });
}

function purchaseItem() {
  let itemValue = this.getAttribute("value");
  let balanceDiv = document.getElementById("balance");
  let balance = localStorage.getItem("balance");
  let calBalance = Number(balance) - Number(itemValue);

  if (calBalance >= 0) {
    localStorage.setItem("balance", calBalance);
    balanceDiv.textContent = calBalance.toLocaleString();

    addLog(`${this.textContent}을 구매했습니다.`);

    // 잔금 최소값 이하일 경우, 전액 반환
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
  let balance = localStorage.getItem("balance");

  if (!balance) {
    localStorage.setItem("balance", 0);
  }

  setValue();
}

function setValue() {
  let balance = localStorage.getItem("balance");
  let balanceDiv = document.getElementById("balance");

  balanceDiv.textContent = Number(balance).toLocaleString();
}

function repayment() {
  let repaymentBtn = document.getElementById("repayment");

  repaymentBtn.addEventListener("click", function () {
    let balance = localStorage.getItem("balance");

    if (balance > 0) {
      addLog(`${Number(balance).toLocaleString()}원을 반환합니다.`);
      // 잔액 초기화
      resetBalance();
    }
  });
}

function resetBalance() {
  let balanceDiv = document.getElementById("balance");
  localStorage.setItem("balance", 0);
  balanceDiv.textContent = 0;
}

function addLog(logMessage) {
  let logContainer = document.getElementById("log-container");

  let logItem = document.createElement("div");
  logItem.id = "log-item";
  logItem.textContent = logMessage;
  logContainer.appendChild(logItem);
  logContainer.scrollTop = logContainer.scrollHeight;
}
