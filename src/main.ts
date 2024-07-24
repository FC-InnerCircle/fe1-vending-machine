import BalanceInformation from "./components/BalanceInformation";
import Layout from "./components/Layout";
import LogInformation from "./components/LogInformation";
import MoneySlot from "./components/MoneySlot";
import VendingItems from "./components/VendingItems";
import "./output.css";

const app = document.getElementById("app");

if (app) {
  const layout = new Layout();
  const balanceInformation = new BalanceInformation();
  const vendingItems = new VendingItems();
  const logInformation = new LogInformation();
  const moneySlot = new MoneySlot();

  const $layoutLeft = document.createElement("div");
  $layoutLeft.appendChild(balanceInformation.render());
  $layoutLeft.appendChild(vendingItems.render());

  const $layoutRight = document.createElement("div");
  $layoutRight.appendChild(moneySlot.render());
  $layoutRight.appendChild(logInformation.render());

  layout.leftSlot = $layoutLeft;
  layout.rightSlot = $layoutRight;

  const layoutContent = layout.render();
  app.appendChild(layoutContent);
}
