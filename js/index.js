import { CHEAPEST_PRICE, ALL_ITEMS_COUNT, GENTLEE } from "./CONSTANT.js";
import {
  $controllerInput,
  $controllerForm,
  $balance,
  $btnWrap,
  $returnBalanceBtn,
  $historyUl,
} from "./elements.js";

let balance = 0;

const changeBalance = (balance) => {
  $balance.value = balance.toLocaleString();
};
const returnBalance = () => {
  if (balance === 0) return;
  logHistory(`${balance}원을 반환합니다.`);
  balance = 0;
  changeBalance(balance);
};
const logHistory = (logText) => {
  const $li = document.createElement("li");
  $li.innerHTML = logText;
  $historyUl.appendChild($li);
  $historyUl.scrollTo({ top: $historyUl.scrollHeight, behavior: "smooth" });
};

const onChangeControllerInput = (inputEvent) => {
  const valueOnlyNumber = inputEvent.target.value.replace(/[^0-9]/g, "");
  $controllerInput.value = valueOnlyNumber;
};
const onSubmitControllerForm = (e) => {
  e.preventDefault();
  if ($controllerInput.value === "") return;
  balance += +$controllerInput.value;
  changeBalance(balance);
  logHistory(`${$controllerInput.value}원을 투입했습니다.`);
  $controllerInput.value = "";
};
const onClickItem = (price, itemName) => {
  if (balance < price) return;

  balance -= price;
  changeBalance(balance);
  logHistory(`${itemName}을 구입하였습니다.`);
  if (balance < CHEAPEST_PRICE) returnBalance();
};
const makeBtns = () => {
  for (let i = 0; i < ALL_ITEMS_COUNT; i++) {
    const $btn = document.createElement("button");
    const price = CHEAPEST_PRICE + i * 100;
    const itemName = `${GENTLEE}${price}`;
    $btn.classList.add("item");
    $btn.innerHTML = itemName;
    $btn.addEventListener("click", () => onClickItem(price, itemName));
    $btn.addEventListener("mousedown", () => {
      if (balance >= price) return;
      changeBalance(price);
    });
    window.addEventListener("mouseup", () => {
      if (balance >= price) return;
      changeBalance(balance);
    });
    $btnWrap.appendChild($btn);
  }
};

$controllerInput.addEventListener("input", onChangeControllerInput);
$controllerForm.addEventListener("submit", onSubmitControllerForm);
$returnBalanceBtn.addEventListener("click", returnBalance);
makeBtns();
