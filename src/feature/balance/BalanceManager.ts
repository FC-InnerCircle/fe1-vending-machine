export default class BalanceManager {
  constructor(
    private balance: number = 0,
    private inputBalance: string | number = ""
  ) {}

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
    // 잔고가 부족하면 -1을 반환
    if (this.isBalanceLowProductPrice(amount)) {
      return -1;
    }

    this.balance -= amount;
    return this.balance;
  }

  getBalance() {
    return this.balance;
  }

  getInputBalance() {
    return this.inputBalance;
  }

  setInputBalance(value: string | number) {
    this.inputBalance = value;
  }

  resetInputBalance() {
    this.inputBalance = "";
  }
}
