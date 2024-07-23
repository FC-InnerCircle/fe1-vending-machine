import { VendingMachine } from "./feature/index";
import { assertEquals, TestSuite } from "./test/Test";

const testSuite = new TestSuite();

/*
자판기 모델을 테스트 합니다.
*/

testSuite.addTest("자판기에는 양수 금액만 투입할 수 있다.", () => {
  const vendingMachine = new VendingMachine();
  vendingMachine.insertMoney(-1000);
  vendingMachine.insertMoney(0);

  assertEquals(vendingMachine.getBalanceWithCommas(), "0");
});

testSuite.addTest("자판기 잔액의 기본값은 0이다.", () => {
  const vendingMachine = new VendingMachine();
  assertEquals(vendingMachine.getBalanceWithCommas(), "0");
});

testSuite.addTest(
  "상품 리스트는 상품이름: FE300, 가격 300원부터 FE1100, 1100원까지 총 9개이다.",
  () => {
    const vendingMachine = new VendingMachine();
    const products = vendingMachine.getAllProduct();

    products.forEach((product, i) => {
      assertEquals(product.getName(), `FE${300 + i * 100}`);
      assertEquals(product.getPrice(), 300 + i * 100);
    });
  }
);

testSuite.addTest("잔액 표시는 세자리마다 콤마가 찍힌다.", () => {
  const vendingMachine = new VendingMachine();
  vendingMachine.insertMoney(1000);
  assertEquals(vendingMachine.getBalanceWithCommas(), "1,000");

  vendingMachine.refundMoney();
  vendingMachine.insertMoney(1000000);
  assertEquals(vendingMachine.getBalanceWithCommas(), "1,000,000");

  vendingMachine.refundMoney();
  vendingMachine.insertMoney(1000000000);
  assertEquals(vendingMachine.getBalanceWithCommas(), "1,000,000,000");
});

testSuite.addTest(
  "모든 동작은 로그에 기록되고 조회할 수 있다. (최신로그가 뒤쪽에 저장)",
  () => {
    const vendingMachine = new VendingMachine();
    vendingMachine.insertMoney(1000);
    vendingMachine.buyProduct("FE300");
    vendingMachine.refundMoney();
    vendingMachine.insertMoney(600);
    vendingMachine.buyProduct("FE500");

    const history = vendingMachine.getHistory();
    assertEquals(history[0], "1,000원을 투입했습니다.");
    assertEquals(history[1], "FE300을 구입했습니다.");
    assertEquals(history[2], "700원을 반환합니다.");
    assertEquals(history[3], "600원을 투입했습니다.");
    assertEquals(history[4], "FE500을 구입했습니다.");
    assertEquals(history[5], "100원을 반환합니다.");
  }
);

testSuite.addTest(
  "상품 구입 후 잔액이 상품 최소 가격보다 낮으면 잔액을 반환한다.",
  () => {
    const vendingMachine = new VendingMachine();
    vendingMachine.insertMoney(400);
    vendingMachine.buyProduct("FE300");

    assertEquals(vendingMachine.getBalanceWithCommas(), "0");
  }
);

testSuite.addTest(
  "잔액이 구매하려는 상품의 가격보다 낮은지 확인할 수 있다.",
  () => {
    const vendingMachine = new VendingMachine();
    vendingMachine.insertMoney(400);
    const isLowBalance = vendingMachine.isLowBalance("FE500");

    assertEquals(isLowBalance, true);

    const isLowBalance2 = vendingMachine.isLowBalance("FE300");

    assertEquals(isLowBalance2, false);
  }
);

testSuite.addTest(
  "금액을 투입하면 잔액이 증가하고, 입력 금액은 초기화된다.",
  () => {
    const vendingMachine = new VendingMachine();
    vendingMachine.insertMoney(1000);

    assertEquals(vendingMachine.getInputBalance(), "");
  }
);

testSuite.addTest("현재 투입된 금액을 반환할 수 있다", () => {
  const vendingMachine = new VendingMachine();
  vendingMachine.insertMoney(1000);
  vendingMachine.refundMoney();

  assertEquals(vendingMachine.getBalanceWithCommas(), "0");
});

testSuite.addTest("상품을 구매하면 잔액이 상품가격만큼 차감된다.", () => {
  const vendingMachine = new VendingMachine();
  vendingMachine.insertMoney(1000);
  vendingMachine.buyProduct("FE300");

  assertEquals(vendingMachine.getBalanceWithCommas(), "700");
});

testSuite.run();
