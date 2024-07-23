import formatNumberWithCommas from "../../utils/formatNumberWithCommas";

export default class BalanceManager {
  constructor(private balance: number = 0) {}

  insertMoney(amount: number) {
    this.balance += amount;
    return this.balance;
  }

  refundMoney() {
    const returnedAmount = this.balance;
    this.balance = 0;
    return returnedAmount;
  }

  isBalanceLowProductPrice(price: number) {
    return this.balance < price;
  }

  subtractMoney(amount: number) {
    if (this.isBalanceLowProductPrice(amount)) {
      return -1;
    }

    this.balance -= amount;
    return this.balance;
  }

  getBalance() {
    return this.balance;
  }

  getBalanceWithCommas() {
    return formatNumberWithCommas(this.balance);
  }
}
