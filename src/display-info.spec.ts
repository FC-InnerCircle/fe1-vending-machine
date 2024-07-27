import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { DisplayInfo } from "./display-info";

describe("DisplayInfo", () => {
  let container: HTMLElement;
  let displayInfo: DisplayInfo;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
    displayInfo = new DisplayInfo(container, { totalAmount: 0 });
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  it("should render initial amount", () => {
    expect(container.innerHTML).toContain("0원");
  });

  it("should update and render new amount", () => {
    displayInfo.setState({ totalAmount: 1000 });
    expect(container.innerHTML).toContain("1,000원");
  });

  it("should render amount with correct formatting", () => {
    displayInfo.setState({ totalAmount: 1234567 });
    expect(container.innerHTML).toContain("1,234,567원");
  });
});
