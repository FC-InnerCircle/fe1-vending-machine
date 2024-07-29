import { $balance, $historyUl } from "./elements.js";

export const changeBalance = (balance) => {
  $balance.value = balance.toLocaleString();
};
export const returnBalance = (balance) => {
  if (balance === 0) return;
  balance = 0;
  changeBalance(balance);
};
export const logHistory = (logText) => {
  const $li = document.createElement("li");
  $li.innerHTML = logText;
  $historyUl.appendChild($li);
  $historyUl.scrollTo({ top: $historyUl.scrollHeight, behavior: "smooth" });
};
