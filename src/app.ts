import { CurrentAmountInput } from "./current-amount.js";
import { InsertAmountInput } from "./insert.js";
import { addLog } from "./log.js";

let insertAmountInput: InsertAmountInput;
let currentAmountInput: CurrentAmountInput;

const handleInsertButton = () => {
  const amount = insertAmountInput.getInsertAmount();
  if (insertAmountInput.validateAmount()) {
    //log쌓고
    addLog(`${amount}원을 투입했습니다.`);
    //current-amount에 추가해주기
    currentAmountInput.addAmount(amount);
    //input 0으로 초기화
    insertAmountInput.resetInsertAmount();
  } else {
    // 아무것도 일어나지 않거나, input 화면에 숫자 입력하라고 알려주기
    return;
  }
};

const handleReturnButton = () => {
  const currentAmount = currentAmountInput.getCurrentAmount();
  if (currentAmount > 0) {
    //log쌓고
    addLog(`${currentAmount}원을 반환합니다.`);
    //current-amount 빈스트링으로 만들기
    currentAmountInput.resetInsertAmount();
  } else {
    // 아무일도 일어나지 않음
    return;
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const app = document.getElementById("app");

  if (app) {
    insertAmountInput = new InsertAmountInput();
    currentAmountInput = new CurrentAmountInput();
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
