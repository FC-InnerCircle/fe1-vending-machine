import { Button, Div, Input } from "./components/index";
import { VendingMachine } from "./feature/index";
import {
  balanceHistoryDisplay,
  mainComponent,
  productDisplayPanel,
  productButtonsPanel,
  balancePanel,
  balanceControllPanel,
} from "./layout";
import "./styles.css";
import formatNumberWithCommas from "./utils/formatNumberWithCommas";

const main = () => {
  const vendingMachine = new VendingMachine();

  const handleInputBalance = (e: Event) => {
    const target = e.target as HTMLInputElement;

    // 음수값 입력 방지 (- 입력 방지)
    if (target.value === "") {
      target.value = "";
      return;
    }

    vendingMachine.setInputBalance(target.value);
  };

  const insertBalance = (amount: number) => {
    if (amount <= 0) {
      return;
    }

    vendingMachine.insertMoney(amount);
    balanceInput.resetValue();
    renderBalanceDisplay();
    renderHistory();
  };

  const refundBalance = () => {
    vendingMachine.refundMoney();
    renderBalanceDisplay();
    renderHistory();
  };

  const renderBalanceDisplay = () => {
    balanceDisplay.setText(vendingMachine.getBalanceWithCommas());
  };

  const showProductPrice = (name: string) => {
    if (vendingMachine.isLowBalance(name)) {
      const productPrice = vendingMachine.getProductPrice(name);
      balanceDisplay.setText(formatNumberWithCommas(productPrice));
    }
  };

  const hideProductPrice = (name: string) => {
    if (vendingMachine.isLowBalance(name)) {
      renderBalanceDisplay();
    }
  };

  const buyProduct = (name: string) => {
    vendingMachine.buyProduct(name);
    renderBalanceDisplay();
    renderHistory();
  };

  const renderHistory = () => {
    balanceHistoryDisplay.getElement().innerHTML = "";

    vendingMachine.getHistory().forEach((history) => {
      const historyDiv = new Div({
        text: history,
      });

      historyDiv.appendTo(balanceHistoryDisplay);
    });

    balanceHistoryDisplay.getElement().scrollTop =
      balanceHistoryDisplay.getElement().scrollHeight;
  };

  const balanceDisplay = new Div({
    className:
      "w-full h-10 border-2 border-black bg-white flex justify-center items-center mb-7",
    text: vendingMachine.getBalanceWithCommas(),
  });

  const balanceInput = new Input({
    className: "w-2/3 h-10 border-2 border-black p-2",
    placeholder: "금액을 입력하세요",
    type: "number",
    value: vendingMachine.getInputBalance().toString(),
    min: 0,
    step: 100,
    onChange: handleInputBalance,
  });

  const balanceButton = new Button({
    className: "w-10 h-10 border-2 border-black ",
    text: "투입",
    onClick: () => insertBalance(Number(vendingMachine.getInputBalance())),
  });

  const refundButton = new Button({
    className: "w-10 h-10 border-2 border-black",
    text: "반환",
    onClick: refundBalance,
  });

  const app = document.getElementById("app") as HTMLElement;

  mainComponent.appendTo(app);

  productDisplayPanel.appendTo(mainComponent);

  balanceDisplay.appendTo(productDisplayPanel);
  productButtonsPanel.appendTo(productDisplayPanel);

  balancePanel.appendTo(mainComponent);

  balanceControllPanel.appendTo(balancePanel);

  balanceInput.appendTo(balanceControllPanel);
  balanceButton.appendTo(balanceControllPanel);
  refundButton.appendTo(balanceControllPanel);

  balanceHistoryDisplay.appendTo(balancePanel);

  const products = vendingMachine.getAllProduct();

  products.forEach((product) => {
    const button = new Button({
      className:
        "w-[100px] h-[60px] bg-blue-500 hover:bg-blue-700 active:bg-blue-900 text-white",
      text: product.getName(),
      onClick: () => buyProduct(product.getName()),
      onMouseDown: () => showProductPrice(product.getName()),
      onMouseUp: () => hideProductPrice(product.getName()),
    });

    button.appendTo(productButtonsPanel);
  });
};

main();
