import formatNumberWithCommas from "../../utils/formatNumberWithCommas";
import BalanceManager from "../balance/BalanceManager";
import HistoryManager from "../history/HistoryManager";
import ProductManager from "../product/ProductManager";

export default class VendingMachine {
  constructor(
    private productManager: ProductManager,
    private balanceManager: BalanceManager,
    private historyManager: HistoryManager
  ) {
    this.productManager = new ProductManager();
    this.balanceManager = new BalanceManager();
    this.historyManager = new HistoryManager();
  }

  insertMoney(amount: number) {
    this.historyManager.addHistory(
      `${formatNumberWithCommas(amount)}원을 투입했습니다.`
    );
    this.balanceManager.insertMoney(amount);
  }

  refundMoney() {
    const refundMoney = this.balanceManager.refundMoney();
    this.historyManager.addHistory(
      `${formatNumberWithCommas(refundMoney)}원을 반환합니다.`
    );
  }

  getBalanceWithCommas() {
    return this.balanceManager.getBalanceWithCommas();
  }

  isLowBalance(name: string) {
    const product = this.productManager.getProduct(name);

    // 상품이 존재하지 않을 경우 false 반환
    if (!product) return false;

    return this.balanceManager.isBalanceLowProductPrice(product.getPrice());
  }

  private isRefundable() {
    return (
      this.productManager.getMinPrice() > this.balanceManager.getBalance() &&
      this.balanceManager.getBalance() > 0
    );
  }

  buyProduct(name: string) {
    const product = this.productManager.getProduct(name);

    if (!product) {
      this.historyManager.addHistory("상품이 존재하지 않습니다.");
      return;
    }

    if (this.balanceManager.isBalanceLowProductPrice(product.getPrice())) {
      return;
    }

    this.balanceManager.subtractMoney(product.getPrice());
    this.historyManager.addHistory(`${product.getName()}을 구입했습니다.`);

    if (this.isRefundable()) {
      this.refundMoney();
    }

    return;
  }

  getAllProduct() {
    return this.productManager.getAllProduct();
  }

  getProductPrice(name: string) {
    const product = this.productManager.getProduct(name);

    if (!product) {
      return -1;
    }

    return product.getPrice();
  }

  getHistory() {
    return this.historyManager.getHistory();
  }
}
