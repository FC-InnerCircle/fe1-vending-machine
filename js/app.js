import { Store } from "./store.js";

class AppStore extends Store {
  constructor() {
    super({ coin: 0, activeProduct: null });
  }

  getActiveProduct() {
    return this.state.activeProduct;
  }

  activeProduct(product) {
    this.setState({ ...this.state, activeProduct: product });
    this.emit("active:product", product);
  }

  deactiveProduct() {
    const oldProduct = this.getActiveProduct();
    if (oldProduct) {
      this.setState({ ...this.state, activeProduct: null });
      this.emit("deactive:product", oldProduct);
    }
  }

  getCoin() {
    return this.state.coin;
  }

  insertCoin(insertCoin) {
    this.setState({ ...this.state, coin: this.getCoin() + insertCoin });
    this.emit("insert:coin", insertCoin);
  }

  consumeCoin(product) {
    const oldValue = this.getCoin();
    const newValue = oldValue - product.price;
    if (newValue > 0) {
      this.setState({ ...this.state, coin: newValue });
      this.emit("consume:coin", product);
    }
  }

  returnCoin() {
    const changeCoin = this.getCoin();
    if (changeCoin > 0) {
      this.setState({ ...this.state, coin: 0 });
      this.emit("return:coin", changeCoin);
    }
  }
}

function createLogMessage(message) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  span.className = "log";
  span.textContent = message;
  li.appendChild(span);
  return li;
}

window.addEventListener("load", () => {
  // Program 시작점
  const store = new AppStore();
  const RETURN_BALANCE_PIVOT = 300;

  const els = {
    balance: document.querySelector("#balance"),
    products: document.querySelectorAll(".product-box button"),
    inputCoin: document.querySelector("#input-coin"),
    btnInsert: document.querySelector("#btn-insert"),
    btnReturn: document.querySelector("#btn-return"),
    logger: document.querySelector("#logger"),
  };

  function appendLogMessage(message) {
    els.logger.appendChild(createLogMessage(message));
    els.logger.scrollTop = els.logger.scrollHeight;
  }

  // 상품 버튼에 대한 이벤트 바인딩
  els.products.forEach((el) => {
    el.price = parseInt(el.getAttribute("value"));
    el.addEventListener("mousedown", function () {
      store.activeProduct(el);
    });
    el.addEventListener("mouseout", function () {
      if (store.getActiveProduct() === el) {
        store.deactiveProduct();
      }
    });
    el.addEventListener("mouseup", function () {
      if (store.getActiveProduct() === el) {
        store.consumeCoin(el);
        // active는 마지막에 호출되어야한다.
        store.deactiveProduct();
      }
    });
  });

  // 입력값 유효성 숫자만 입력할 수 있다.
  els.inputCoin.addEventListener("input", function () {
    this.value = this.value.replace(/[^0-9]/g, "");
  });

  //  투입 버튼 이벤트
  els.btnInsert.addEventListener("click", function () {
    const coin = els.inputCoin.value;
    if (coin > 0) {
      els.inputCoin.value = "";
      store.insertCoin(parseInt(coin));
    }
  });

  // 반환 버튼 이벤트
  els.btnReturn.addEventListener("click", function () {
    store.returnCoin();
  });

  // product 가 active 될때
  store.on("active:product", (product) => {
    // 0원일때 상품을 클릭하는 경우 상품의 가격을 보여준다.
    if (store.getCoin() === 0) {
      els.balance.textContent = product.price.toLocaleString();
    }
  });
  // product 가 deactive 될때
  store.on("deactive:product", (product) => {
    // 0원인 경우 다시 0으로 돌아온다.
    if (store.getCoin() === 0) {
      els.balance.textContent = "0";
    }
  });

  // 금액 투입에 대한 화면 처리
  store.on("insert:coin", (insertCoin) => {
    els.balance.textContent = store.getCoin().toLocaleString();
    appendLogMessage(`${insertCoin.toLocaleString()}원을 투입했습니다.`);
  });

  // 상품 구매에 대한 화면 처리
  store.on("consume:coin", (product) => {
    appendLogMessage(`${product.textContent}을 구입합니다.`);
    if (store.getCoin() < RETURN_BALANCE_PIVOT) {
      // 반환처리
      store.returnCoin();
    } else {
      els.balance.textContent = store.getCoin().toLocaleString();
    }
  });

  // 반환에 대한 화면 처리
  store.on("return:coin", (changeCoin) => {
    appendLogMessage(`${changeCoin.toLocaleString()}원을 반환합니다.`);
    els.balance.textContent = "0";
  });
});
