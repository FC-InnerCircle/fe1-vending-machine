import { CurrentAmountInput } from "./components/current-amount.js";
import { InsertAmountInput } from "./components/insert.js";
import { ItemButton } from "./components/item-button.js";
import { LogDisplay } from "./components/log-display.js";

const MIN_ITEM_PRICE = 300;
let insertAmountInput: InsertAmountInput;
let currentAmountInput: CurrentAmountInput;
let logDisplay: LogDisplay;

const handleInsertButton = () => {
  const amount = insertAmountInput.getInsertAmount();
  if (insertAmountInput.validateAmount()) {
    //log쌓고
    logDisplay.addLog(`${amount}원을 투입했습니다.`);
    //current-amount에 추가해주기
    currentAmountInput.addAmount(amount);
    //input 0으로 초기화
    insertAmountInput.resetInsertAmount();
  } else {
    // 아무것도 일어나지 않음
    return;
  }
};

const handleReturnButton = () => {
  const currentAmount = currentAmountInput.getCurrentAmount();
  if (currentAmount > 0) {
    //log쌓고
    logDisplay.addLog(`${currentAmount}원을 반환합니다.`);
    //current-amount 빈스트링으로 만들기
    currentAmountInput.resetInsertAmount();
  } else {
    // 아무일도 일어나지 않음
    return;
  }
};

const handlePurchaseItem = (price: number, itemName: string) => {
  const currentAmount = currentAmountInput.getCurrentAmount();
  //price보다 current amount가 작으면 current amount에 상품 가격 3초동안 띄우고 리턴
  if (currentAmount < price)
    return currentAmountInput.alertInsufficientAmount(price);

  //price보다 current amount가 크거나 같으면
  //값 만큼 current amount에서 빼기
  currentAmountInput.subtractAmount(price);
  //구매했다고 로그남기기
  logDisplay.addLog(`${itemName}을 구매했습니다.`);

  //만약 잔액이 최소 상품보다 작으면 남은 금액 반환하기
  const remainingAmount = currentAmountInput.getCurrentAmount();
  if (remainingAmount < MIN_ITEM_PRICE) handleReturnButton();
};

const handleClickItem = (e: MouseEvent) => {
  const target = e.target as HTMLElement;

  if (
    target.className === "product-button" &&
    target.dataset.price &&
    target.textContent
  ) {
    const price = parseInt(target.dataset.price);
    const itemName = target.textContent;
    handlePurchaseItem(price, itemName);
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const app = document.getElementById("app");

  if (app) {
    const itemButtons = [
      new ItemButton("FE300", 300),
      new ItemButton("FE400", 400),
      new ItemButton("FE500", 500),
      new ItemButton("FE600", 600),
      new ItemButton("FE700", 700),
      new ItemButton("FE800", 800),
      new ItemButton("FE900", 900),
      new ItemButton("FE1000", 1000),
      new ItemButton("FE1100", 1100),
    ];
    insertAmountInput = new InsertAmountInput();
    currentAmountInput = new CurrentAmountInput();
    logDisplay = new LogDisplay();
    const insertButton = document.querySelector<HTMLButtonElement>(
      ".control-button#insert"
    );
    const returnButton = document.querySelector<HTMLButtonElement>(
      ".control-button#return"
    );
    const productContainer = document.getElementById("product-list");

    if (insertButton)
      insertButton.addEventListener("click", handleInsertButton);
    if (returnButton)
      returnButton.addEventListener("click", handleReturnButton);
    if (productContainer) {
      itemButtons.forEach((button) => {
        productContainer.appendChild(button.render());
      });

      //이벤트 위임
      productContainer.addEventListener("click", handleClickItem);
    }
  }
});
