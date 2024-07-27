import './scss/main.scss'
import { setSlot } from './js/setSlot.js'
import { setProduct } from './js/setProduct.js'
import { PRODUCT_LIST } from './js/utils/constants.js';


function main() {
  setSlot();
  setProduct(PRODUCT_LIST)
}

main()
