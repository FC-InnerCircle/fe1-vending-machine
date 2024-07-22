import Product from "./Product";

export default class ProductManager {
  constructor(private products: Product[] = []) {
    this.products = this.initProducts();
  }

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
    return Math.min(...this.products.map((product) => product.getPrice()));
  }
}
