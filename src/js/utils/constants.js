export const PRODUCT_LIST = ['300', '400', '500', '600', '700', '800', '900', '1000', '1100'];

export function getMinProductPrice() {
  return Math.min(...PRODUCT_LIST.map(price => parseInt(price, 10)));
}
