import { CurrentAmountInput } from "./components/current-amount.js";
import { InsertAmountInput } from "./components/insert.js";
import { ItemButton } from "./components/item-button.js";
import { LogDisplay } from "./components/log-display.js";

const ITEM_BUTTONS = [
  { name: "FE300", price: 300 },
  { name: "FE400", price: 400 },
  { name: "FE500", price: 500 },
  { name: "FE600", price: 600 },
  { name: "FE700", price: 700 },
  { name: "FE800", price: 800 },
  { name: "FE900", price: 900 },
  { name: "FE1000", price: 1000 },
  { name: "FE1100", price: 1100 },
];

let minPrice: number;
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
  }
};

const handleReturnButton = () => {
  const currentAmount = currentAmountInput.getCurrentAmount();
  if (currentAmount > 0) {
    //log쌓고
    logDisplay.addLog(`${currentAmount}원을 반환합니다.`);
    //current-amount 빈스트링으로 만들기
    currentAmountInput.resetInsertAmount();
  }

  //InsertAmountInput에 값을 적고 반환을 눌렀다면, InsertAmountInput의 값도 리셋해주기
  if (insertAmountInput.getInsertAmount() > 0)
    insertAmountInput.resetInsertAmount();
};

const handlePurchaseItem = (price: number, itemName: string) => {
  const currentAmount = currentAmountInput.getCurrentAmount();
  //price보다 current amount가 작으면 current amount에 상품 가격 2초동안 띄우고 리턴
  if (currentAmount < price)
    return currentAmountInput.alertInsufficientAmount(price);

  //price보다 current amount가 크거나 같으면
  //값 만큼 current amount에서 빼기
  currentAmountInput.subtractAmount(price);
  //구매했다고 로그남기기
  logDisplay.addLog(`${itemName}을 구매했습니다.`);

  //만약 잔액이 최소 상품보다 작으면 남은 금액 반환하기
  const remainingAmount = currentAmountInput.getCurrentAmount();
  if (remainingAmount < minPrice) handleReturnButton();
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

const getProductItemElements = (items: { name: string; price: number }[]) => {
  return items.map(({ name, price }) => new ItemButton(name, price));
};

const getMinPrice = (items: { name: string; price: number }[]) =>
  Math.min(...items.map(({ price }) => price));

document.addEventListener("DOMContentLoaded", () => {
  const app = document.getElementById("app");

  if (app) {
    //초기셋팅
    minPrice = getMinPrice(ITEM_BUTTONS);
    insertAmountInput = new InsertAmountInput();
    currentAmountInput = new CurrentAmountInput();
    logDisplay = new LogDisplay();

    const itemButtons = getProductItemElements(ITEM_BUTTONS);
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
      itemButtons.forEach((button) =>
        productContainer.appendChild(button.render())
      );

      //이벤트 위임
      productContainer.addEventListener("click", handleClickItem);
    }
  }
});
