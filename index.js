const $controllerInput = document.querySelector(".controller_input");
const $controllerForm = document.querySelector(".controller");
const $balance = document.querySelector(".balance");
const $btnWrap = document.querySelector(".btn_wrap");
const $returnBalanceBtn = document.querySelector(".return_balance");
const $historyUl = document.querySelector(".history");

const CHEAPEST_PRICE = 300;
const ALL_ITEMS_COUNT = 9;
const GENTLEE = "GT";
let balance = 0;

const addComma = (number) =>
  number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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
      balance < price && changeBalance(price);
    });
    $btn.addEventListener("mouseup", () => {
      balance < price && changeBalance(balance);
    });
    $btn.addEventListener("mouseout", () => {
      balance < price && changeBalance(balance);
    });
    $btnWrap.appendChild($btn);
  }
};

$controllerInput.addEventListener("input", onChangeControllerInput);
$controllerForm.addEventListener("submit", onSubmitControllerForm);
$returnBalanceBtn.addEventListener("click", returnBalance);
makeBtns();
