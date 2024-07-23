import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { DisplayLog } from "./display-log";

describe("DisplayLog", () => {
  let container: HTMLElement;
  let displayLog: DisplayLog;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
    displayLog = new DisplayLog(container, { logs: [] });
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  it("should render empty logs", () => {
    expect(container.querySelectorAll("div[role='log']")).toHaveLength(0);
  });

  it("should render initial logs", () => {
    displayLog.setState({ logs: ["Log 1", "Log 2"] });
    expect(container.querySelectorAll("div[role='log']")).toHaveLength(2);
    expect(container.innerHTML).toContain("Log 1");
    expect(container.innerHTML).toContain("Log 2");
  });

  it("should update logs", () => {
    displayLog.setState({ logs: ["Log 1"] });
    expect(container.querySelectorAll("div[role='log']")).toHaveLength(1);

    displayLog.setState({ logs: ["Log 1", "Log 2"] });
    expect(container.querySelectorAll("div[role='log']")).toHaveLength(2);
    expect(container.innerHTML).toContain("Log 1");
  });

  it("should scroll to bottom when new logs are added", () => {
    const spy = vi.spyOn(container, "scrollTop", "set");

    displayLog.setState({ logs: ["Log 1"] });
    displayLog.setState({ logs: ["Log 1", "Log 2"] });

    expect(spy).toHaveBeenCalledWith(container.scrollHeight);
  });
});
