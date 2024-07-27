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

const createLogMessage = (message) => {
  const li = document.createElement("li");
  const span = document.createElement("span");
  span.className = "log";
  span.textContent = message;
  li.appendChild(span);
  return li;
};

const createLogMessageHandler = (element) => {
  return (message) => {
    element.appendChild(createLogMessage(message));
    element.scrollTop = element.scrollHeight;
  };
};

const INIT_PRODUCT_ITEMS = () => {
  return new Array(9).fill().map((_, i) => {
    const price = (i + 3) * 100;
    return { price, label: `FE${price}` };
  });
};

window.addEventListener("DOMContentLoaded", () => {
  // Program 시작점
  const PRODUCT_ITEMS = INIT_PRODUCT_ITEMS();
  const RETURN_BALANCE_PIVOT = Math.min(...PRODUCT_ITEMS.map(({ price }) => price));
  const store = new AppStore();

  const els = {
    balance: document.querySelector("#balance"),
    productBox: document.querySelector(".product-box"),
    inputCoin: document.querySelector("#input-coin"),
    btnInsert: document.querySelector("#btn-insert"),
    btnReturn: document.querySelector("#btn-return"),
    logger: document.querySelector("#logger"),
  };

  // append products
  els.productBox.innerHTML = PRODUCT_ITEMS.map(({ label }, idx) => `<button type="button" data-key="${idx}">${label}</button>`).join("");

  const handleProductMouseEvent = (listener) => {
    return function onProductBoxMouseEventListener(e) {
      if (e.target && e.target.dataset.key) {
        const product = PRODUCT_ITEMS[e.target.dataset.key];
        listener.call(this, e, product);
      }
    };
  };

  els.productBox.addEventListener(
    "mousedown",
    handleProductMouseEvent(function (e, product) {
      store.activeProduct(product);
    })
  );

  els.productBox.addEventListener(
    "mouseleave",
    handleProductMouseEvent(function (e, product) {
      if (store.getActiveProduct() === product) {
        store.deactiveProduct();
      }
    })
  );

  els.productBox.addEventListener(
    "click",
    handleProductMouseEvent(function (e, product) {
      if (store.getActiveProduct() === product) {
        store.consumeCoin(product);
        store.deactiveProduct();
      }
    })
  );

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

  // 로그 핸들링 함수
  const appendLogMessage = createLogMessageHandler(els.logger);

  // 금액 투입에 대한 화면 처리
  store.on("insert:coin", (insertCoin) => {
    els.balance.textContent = store.getCoin().toLocaleString();
    appendLogMessage(`${insertCoin.toLocaleString()}원을 투입했습니다.`);
  });

  // 상품 구매에 대한 화면 처리
  store.on("consume:coin", (product) => {
    appendLogMessage(`${product.label}을 구입합니다.`);
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
