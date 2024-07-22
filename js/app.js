import { Store } from "./store.js";

class AppStore extends Store {
  constructor() {
    super({ coin: 0, activeProduct: null });
  }

  getActiveProduct() {
    return this.state.activeProduct;
  }

  activeProduct(activeProduct) {
    this.setState({ ...this.state, activeProduct });
    this.emit("active:product", activeProduct);
  }

  deactiveProduct() {
    const activeProduct = this.getActiveProduct();
    this.setState({ ...this.state, activeProduct: null });
    this.emit("deactive:product", activeProduct);
  }

  getCoin() {
    return this.state.coin;
  }

  insertCoin(coin) {
    const newValue = this.getCoin() + parseInt(coin);
    this.setState({ ...this.state, coin: newValue });
    this.emit("insert:coin", newValue);
  }

  consumeCoin(price) {
    const newValue = this.getCoin() - price;
    if (newValue > 0) {
      this.setState({ ...this.state, coin: newValue });
      this.emit("consume:coin", newValue);
    }
  }
}

window.addEventListener("load", () => {
  // Program 시작점
  const store = new AppStore();
});
