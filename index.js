const $controllerInput = document.querySelector(".controller_input");
const $controllerForm = document.querySelector(".controller");
const $balance = document.querySelector(".balance");
const $btnWrap = document.querySelector(".btn_wrap");

const CHEAPEST_PRICE = 300;
const ALL_ITEMS_COUNT = 9;
const GT = "GT";
let balance = 0;

const addComma = (number) =>
  number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
const changeBalance = (balance) => {
  $balance.value = balance;
};

const onChangeControllerInput = (inputEvent) => {
  const valueOnlyNumber = inputEvent.target.value.replace(/[^0-9]/g, "");
  $controllerInput.value = valueOnlyNumber;
};
const onSubmitControllerForm = (e) => {
  e.preventDefault();
  balance += +$controllerInput.value;
  changeBalance(balance.toLocaleString());
  $controllerInput.value = "";
};
const onClickItem = (price) => {
  if (balance < price) return;

  balance -= price;
  changeBalance(balance);
};
const makeBtns = () => {
  for (let i = 0; i < ALL_ITEMS_COUNT; i++) {
    const btn = document.createElement("button");
    const price = CHEAPEST_PRICE + i * 100;
    btn.classList.add("item");
    btn.innerHTML = `${GT}${price}`;
    btn.addEventListener("click", () => onClickItem(price));

    $btnWrap.appendChild(btn);
  }
};

$controllerInput.addEventListener("input", onChangeControllerInput);
$controllerForm.addEventListener("submit", onSubmitControllerForm);
makeBtns();
