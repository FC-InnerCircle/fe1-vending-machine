const getInsertAmount = () => {
  const insertAmountInput = document.getElementById(
    "amount-input"
  ) as HTMLInputElement;
  return insertAmountInput ? parseInt(insertAmountInput.value) : 0;
};
const validateAmount = (value: number) => {
  return value > 0;
};

const handleInsertButton = () => {
  if (validateAmount(getInsertAmount())) {
    //log쌓고
    //current-amount에 추가해주기
    //input 0으로 초기화
  } else {
    // 아무것도 일어나지 않거나, input 화면에 숫자 입력하라고 알려주기
  }
};

const handleReturnButton = () => {
  if (validateAmount(4000)) {
    //log쌓고
    //current-amount 빈스트링으로 만들기
  } else {
    // 아무일도 일어나지 않음
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const app = document.getElementById("app");

  if (app) {
    const logWrapper = document.getElementById("log-wrapper");
    const insertButton = document.querySelector<HTMLButtonElement>(
      ".control-button#insert"
    );
    const returnButton = document.querySelector<HTMLButtonElement>(
      ".control-button#return"
    );

    if (insertButton)
      insertButton.addEventListener("click", handleInsertButton);
    if (returnButton)
      returnButton.addEventListener("click", handleReturnButton);
  }
});
