import {
  getItemValue,
  addLog,
  setValue,
  resetBalance,
  previewItemPrice,
} from "./utils.js";

export function createItems() {
  const itemContainer = document.getElementById("item-container");

  for (let value = 300; value <= 1100; value += 100) {
    const item = document.createElement("button");
    item.id = "item";
    item.setAttribute("data-value", value);
    item.className =
      "p-4 text-center bg-yellow-200 hover:bg-yellow-600 active:bg-yellow-700 cursor-pointer";
    item.textContent = "FE" + value;

    item.addEventListener("mousedown", (event) =>
      handleItemMouseDown(event, value)
    );
    item.addEventListener("mouseup", (event) =>
      handleItemMouseUp(event, value)
    );

    itemContainer.appendChild(item);
  }
}

export function setupFormHandlers() {
  const form = document.getElementById("vending-form");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const action = event.submitter.value;

    if (action === "insert") {
      insertAmount();
    } else if (action === "repayment") {
      handleRepayment();
    }
  });
}

function insertAmount() {
  const balanceDiv = document.getElementById("balance");
  let balance = Number(localStorage.getItem("balance"));
  const amountValue = getItemValue();

  if (amountValue > 0) {
    balance += amountValue;
    localStorage.setItem("balance", balance);

    balanceDiv.textContent = balance.toLocaleString();
    addLog(`${amountValue.toLocaleString()}원을 투입했습니다.`);
    document.getElementById("input").value = "";
  }
}

function handleRepayment() {
  const balance = localStorage.getItem("balance");

  if (balance > 0) {
    addLog(`${Number(balance).toLocaleString()}원을 반환합니다.`);
    resetBalance();
  }
}

function handleItemMouseDown(event, itemValue) {
  previewItemPrice(itemValue);
}

function handleItemMouseUp(event, itemValue) {
  purchaseItem(itemValue);
}

export function purchaseItem(itemValue) {
  const balance = Number(localStorage.getItem("balance"));
  const balanceDiv = document.getElementById("balance");
  const calBalance = balance - itemValue;

  if (calBalance >= 0) {
    localStorage.setItem("balance", calBalance);
    balanceDiv.textContent = calBalance.toLocaleString();

    addLog(`FE${itemValue}을 구매했습니다.`);

    if (calBalance < 300 && calBalance > 1) {
      resetBalance();
      addLog("잔액이 300원미만이므로 자동잔액반환되었습니다.");
    }
  } else {
    addLog("잔액이 부족합니다.");
  }

  if (balance === 0) {
    setTimeout(() => {
      balanceDiv.textContent = "0";
    }, 0);
  }
}

export function setStorage() {
  const balance = localStorage.getItem("balance");

  if (!balance) {
    localStorage.setItem("balance", 0);
  }

  setValue();
}
