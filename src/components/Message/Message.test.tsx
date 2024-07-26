import { render, screen } from "@testing-library/react";
import Message from "./Message";
import { describe, test, expect } from "vitest";

describe("Message", () => {
  test("메시지를 출력합니다.", () => {
    const message = "10원이 반환됩니다.";
    render(<Message>{message}</Message>);
    expect(screen.getByText(message)).toBeDefined();
  });
});
