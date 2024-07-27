import { render, screen } from "@testing-library/react";
import VendingMachineProvider from "../../providers/VendingMachineProvider";
import BalanceDisplayContainer from "./BalanceDisplayContainer";
import { describe, expect, test } from "vitest";

describe("BalanceDisplayContainer", () => {
  test("잔고 초기값은 0으로 출력된다.", () => {
    render(
      <VendingMachineProvider>
        <BalanceDisplayContainer />
      </VendingMachineProvider>
    );

    expect(screen.getByText("0")).toBeInTheDocument();
  });
});
