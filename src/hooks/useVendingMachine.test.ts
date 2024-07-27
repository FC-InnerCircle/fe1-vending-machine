import { act, renderHook } from "@testing-library/react";
import useVendingMachine from "./useVendingMachine";
import { beforeEach, describe, expect, test } from "vitest";
import { VendingMachine } from "../features";

describe("useVendingMachine", () => {
  let vendingMachine: VendingMachine;

  beforeEach(() => {
    vendingMachine = new VendingMachine();
  });

  test("잔액의 초기값은 0이다.", () => {
    const { result } = renderHook(() => useVendingMachine(vendingMachine));

    expect(result.current.balance).toBe("0");
  });

  test("입력 금액의 초기값은 빈 문자열이다.", () => {
    const { result } = renderHook(() => useVendingMachine(vendingMachine));

    expect(result.current.inputBalance).toBe("");
  });

  test("금액을 입력하면 입력 금액이 변경된다.", () => {
    const { result } = renderHook(() => useVendingMachine(vendingMachine));

    act(() => {
      result.current.handleInputBalance({
        target: { value: "1000" },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    expect(result.current.inputBalance).toBe("1000");
  });

  test("금액을 투입하면 입력 금액이 초기화되고, 잔액이 증가한다.", () => {
    const { result } = renderHook(() => useVendingMachine(vendingMachine));

    act(() => {
      result.current.handleInputBalance({
        target: { value: "1000" },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    act(() => {
      result.current.insertBalance();
    });

    expect(result.current.inputBalance).toBe("");
    expect(result.current.balance).toBe("1,000");
  });

  test("0원 이하의 금액은 투입할 수 없다.", () => {
    const { result } = renderHook(() => useVendingMachine(vendingMachine));

    act(() => {
      result.current.handleInputBalance({
        target: { value: "0" },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    act(() => {
      result.current.insertBalance();
    });

    expect(result.current.inputBalance).toBe("0");
    expect(result.current.balance).toBe("0");
    expect(result.current.history).toEqual([]);

    act(() => {
      result.current.handleInputBalance({
        target: { value: "-1000" },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    act(() => {
      result.current.insertBalance();
    });

    expect(result.current.inputBalance).toBe("");
    expect(result.current.balance).toBe("0");
    expect(result.current.history).toEqual([]);
  });

  test("잔액이 0원일 때 반환을 해도 아무 일도 일어나지 않는다.", () => {
    const { result } = renderHook(() => useVendingMachine(vendingMachine));

    act(() => {
      result.current.refundBalance();
    });

    console.log(result.current.history);

    expect(result.current.balance).toBe("0");
    expect(result.current.history).toEqual([]);
  });

  test("반환 버튼을 누르면 잔액이 0원이 된다.", () => {
    const { result } = renderHook(() => useVendingMachine(vendingMachine));

    act(() => {
      result.current.handleInputBalance({
        target: { value: "2000" },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    act(() => {
      result.current.insertBalance();
    });

    act(() => {
      result.current.refundBalance();
    });

    expect(result.current.balance).toBe("0");
    expect(result.current.history).toContain("2,000원을 반환합니다.");
  });

  test("상품 목록은 가격 300 ~ 1100, 이름 FE300 ~ FE1100인 상품 9개가 반환된다.", () => {
    const { result } = renderHook(() => useVendingMachine(vendingMachine));

    expect(result.current.products.length).toBe(9);

    result.current.products.forEach((product, index) => {
      expect(product.getPrice()).toBe(300 + index * 100);
      expect(product.getName()).toBe(`FE${300 + index * 100}`);
    });
  });

  test("모든 동작은 history에 기록되고, 최신 기록이 배열의 마지막에 위치한다.", () => {
    const { result } = renderHook(() => useVendingMachine(vendingMachine));
    const product = result.current.products[0];

    act(() => {
      result.current.handleInputBalance({
        target: { value: "2000" },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    act(() => {
      result.current.insertBalance();
    });

    act(() => {
      result.current.buyProduct(product.getName());
    });

    act(() => {
      result.current.refundBalance();
    });

    expect(result.current.history).toEqual([
      "2,000원을 투입했습니다.",
      `${product.getName()}을 구입했습니다.`,
      "1,700원을 반환합니다.",
    ]);
  });

  test("상품을 구매하면 잔액이 차감되고, history에 기록된다.", () => {
    const { result } = renderHook(() => useVendingMachine(vendingMachine));
    const product = result.current.products[0];

    act(() => {
      result.current.handleInputBalance({
        target: { value: "1000" },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    act(() => {
      result.current.insertBalance();
    });

    act(() => {
      result.current.buyProduct(product.getName());
    });

    expect(result.current.balance).toBe("700");
    expect(result.current.history).toContain(
      `${product.getName()}을 구입했습니다.`
    );
  });

  test("상품 구입 후 잔액이 상품 최소 금액보다 작으면 자동으로 반환된다.", () => {
    const { result } = renderHook(() => useVendingMachine(vendingMachine));
    const product = result.current.products[0];

    act(() => {
      result.current.handleInputBalance({
        target: { value: "500" },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    act(() => {
      result.current.insertBalance();
    });

    act(() => {
      result.current.buyProduct(product.getName());
    });

    expect(product.getPrice()).toBe(300);
    expect(result.current.balance).toBe("0");
    expect(result.current.history).toContain(`200원을 반환합니다.`);
  });

  test("잔액보다 비싼 상품을 선택하면 잔액에 상품 가격이 표시된다.", () => {
    const { result } = renderHook(() => useVendingMachine(vendingMachine));

    act(() => {
      result.current.handleInputBalance({
        target: { value: "500" },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    act(() => {
      result.current.insertBalance();
    });

    act(() => {
      result.current.showProductPrice("FE1100");
    });

    expect(result.current.balance).toBe("1,100");
  });
});
