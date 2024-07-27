export default class Product {
  constructor(private name: string, private price: number) {}

  isProductHighPrice(money: number) {
    return money > this.price;
  }

  getName() {
    return this.name;
  }

  getPrice() {
    return this.price;
  }
}
