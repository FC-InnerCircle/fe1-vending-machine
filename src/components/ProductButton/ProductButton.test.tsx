import { describe, test, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ProductButton from "./ProductButton";

describe("ProductButton", () => {
  test("버튼 텍스트를 화면에 출력한다.", () => {
    render(
      <ProductButton
        onMouseDown={() => {}}
        onMouseUp={() => {}}
        onClick={() => {}}
      >
        Click me
      </ProductButton>
    );

    expect(screen.getByText("Click me")).toBeDefined();
  });

  test("버튼을 클릭하면 onClick 함수가 호출된다.", async () => {
    const onClick = vi.fn();
    render(
      <ProductButton
        onMouseDown={() => {}}
        onMouseUp={() => {}}
        onClick={onClick}
      >
        Click me
      </ProductButton>
    );

    await userEvent.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  test("버튼을 누르면 onMouseDown 함수가 호출된다.", async () => {
    const onMouseDown = vi.fn();
    render(
      <ProductButton
        onMouseDown={onMouseDown}
        onMouseUp={() => {}}
        onClick={() => {}}
      >
        Click me
      </ProductButton>
    );

    await userEvent.click(screen.getByRole("button"));
    expect(onMouseDown).toHaveBeenCalledTimes(1);
  });

  test("버튼을 누르면 onMouseUp 함수가 호출된다.", async () => {
    const onMouseUp = vi.fn();
    render(
      <ProductButton
        onMouseDown={() => {}}
        onMouseUp={onMouseUp}
        onClick={() => {}}
      >
        Click me
      </ProductButton>
    );

    await userEvent.click(screen.getByRole("button"));
    expect(onMouseUp).toHaveBeenCalledTimes(1);
  });
});
