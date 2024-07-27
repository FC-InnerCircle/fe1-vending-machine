import Product from "./Product";

export default class ProductManager {
  constructor(private products: Product[] = []) {
    this.products = this.initProducts();
  }

  // 요구사항에 맞게 상품을 초기화하는 메서드
  private initProducts() {
    const productList = [];

    for (let i = 0; i < 9; i++) {
      const product = new Product(`FE${300 + i * 100}`, 300 + i * 100);
      productList.push(product);
    }

    return productList;
  }

  getAllProduct() {
    return [...this.products];
  }

  getProduct(name: string) {
    return this.products.find((product) => product.getName() === name);
  }

  getMinPrice() {
    return this.products.reduce((min, product) => {
      const price = product.getPrice();
      return price < min ? price : min;
    }, Infinity);
  }
}
