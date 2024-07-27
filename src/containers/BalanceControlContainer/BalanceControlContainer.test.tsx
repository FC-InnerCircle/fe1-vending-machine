import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import VendingMachineProvider from "../../providers/VendingMachineProvider";
import { describe, expect, test } from "vitest";
import BalanceControlContainer from "./BalanceControlContainer";

const getRender = () => {
  return (
    <VendingMachineProvider>
      <BalanceControlContainer />
    </VendingMachineProvider>
  );
};

describe("BalanceControlContainer", () => {
  test("금액 입력창, 투입 버튼, 반환 버튼이 화면에 출력된다.", () => {
    render(getRender());

    expect(
      screen.getByPlaceholderText("금액을 입력하세요")
    ).toBeInTheDocument();
    expect(screen.getByText("투입")).toBeInTheDocument();
    expect(screen.getByText("반환")).toBeInTheDocument();
  });

  test("금액을 입력하고 투입 버튼을 클릭하면 입력창이 초기화 된다.", async () => {
    render(getRender());

    const input = screen.getByPlaceholderText("금액을 입력하세요");
    const button = screen.getByText("투입");

    await userEvent.type(input, "1000");
    await userEvent.click(button);

    expect(input).toHaveValue(null);
  });
});
