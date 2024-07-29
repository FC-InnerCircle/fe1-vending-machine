export function getItemValue() {
  const { value } = document.getElementById("input");
  return Number(value);
}

export function addLog(logMessage) {
  const logContainer = document.getElementById("log-container");

  const logItem = document.createElement("div");
  logItem.id = "log-item";
  logItem.textContent = logMessage;
  logContainer.appendChild(logItem);
  logContainer.scrollTop = logContainer.scrollHeight;
}

export function setValue() {
  const balance = localStorage.getItem("balance");
  const balanceDiv = document.getElementById("balance");

  balanceDiv.textContent = Number(balance).toLocaleString();
}

export function resetBalance() {
  const balanceDiv = document.getElementById("balance");
  localStorage.setItem("balance", 0);
  balanceDiv.textContent = 0;
}

export function previewItemPrice(itemValue) {
  const balanceDiv = document.getElementById("balance");
  const balance = Number(localStorage.getItem("balance"));

  if (balance === 0) {
    balanceDiv.textContent = itemValue.toLocaleString();
  }
}
