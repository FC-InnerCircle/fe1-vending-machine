import { render, screen } from "@testing-library/react";
import BalanceDisplay from "./BalanceDisplay";
import { describe, test, expect } from "vitest";

describe("BalanceDisplay", () => {
  test("입력된 값을 화면에 출력한다.", () => {
    const value = 1000;

    render(<BalanceDisplay>{value}</BalanceDisplay>);
    expect(screen.getByText(value)).toBeInTheDocument();
  });
});
