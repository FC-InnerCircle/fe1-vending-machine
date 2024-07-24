const $controllerInput = document.querySelector(".controller_input");
const $controllerForm = document.querySelector(".controller");
const $balance = document.querySelector(".balance");

let balance = 0;

const addComma = (number) =>
  number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

const onChangeControllerInput = (inputEvent) => {
  const valueOnlyNumber = inputEvent.target.value.replace(/[^0-9]/g, "");
  $controllerInput.value = valueOnlyNumber;
};

$controllerInput.addEventListener("input", onChangeControllerInput);

$controllerForm.addEventListener("submit", (e) => {
  e.preventDefault();
  balance += +$controllerInput.value;
  $balance.value = balance.toLocaleString();
  $controllerInput.value = "";
});
