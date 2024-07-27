import { render, screen } from "@testing-library/react";
import BalanceInput from "./BalanceInput";
import { describe, test, vi, expect } from "vitest";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/vitest";

describe("BalanceInput", () => {
  test("입력한 value 값이 출력된다.", () => {
    const value = "500";

    render(<BalanceInput onChange={() => {}} value={value} />);

    const inputElement = screen.getByRole("spinbutton");

    expect(inputElement).toBeDefined();
    expect(inputElement).toHaveValue(Number(value));
  });

  test("입력한 숫자의 길이만큼 onChange 함수가 호출된다.", async () => {
    const onChange = vi.fn();
    const value = "500";
    const inputValue = "1000";

    render(<BalanceInput onChange={onChange} value={value} />);

    const inputElement = screen.getByRole("spinbutton");

    await userEvent.type(inputElement, inputValue);

    expect(onChange).toHaveBeenCalledTimes(inputValue.length);
  });
});
