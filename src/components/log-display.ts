import { Log } from "./log.js";

export class LogDisplay {
  private logDisplayElement: HTMLElement;

  constructor() {
    this.logDisplayElement = document.getElementById(
      "log-wrapper"
    ) as HTMLElement;
    if (!this.logDisplayElement) {
      throw new Error(`Element with id amount-input not found`);
    }
  }

  addLog(content: string) {
    const newLog = new Log(content);
    this.logDisplayElement.appendChild(newLog.render());
  }
}
