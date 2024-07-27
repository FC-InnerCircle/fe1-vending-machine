import { createProductButton } from './product/createProductButton.js'
import { setProductEvent } from './product/setProductEvent.js'

function setProduct(products) {
  const container = document.querySelector('.container__vendingmachine__buttons')
  products.forEach((product) => {
    container.append(createProductButton(`FE${product}`, product))
  })
  setProductEvent()
}

export { setProduct }