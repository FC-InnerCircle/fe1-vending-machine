const $controllerInput = document.querySelector(".controller_input");

const onChangeControllerInput = (inputEvent) => {
  const val = inputEvent.target.value;
  const val2 = val.replace(/[^0-9]/g, "");
  $controllerInput.value = val2;
};

$controllerInput.addEventListener("input", onChangeControllerInput);
