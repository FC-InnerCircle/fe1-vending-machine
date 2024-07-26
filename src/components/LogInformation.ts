import { store } from "../store";
export default class LogInformation {
  logs: string[];
  $logInformation!: HTMLElement;

  constructor() {
    store.subscribe(() => this.updateLogs());
    this.logs = store.getLogs();
  }

  render(): HTMLElement {
    const $logInformation = document.createElement("div");
    $logInformation.className =
      "border-2 border-inherit rounded overflow-y-auto overflow-x-clip";
    $logInformation.style.height = "165px";
    this.updateLogs();
    this.$logInformation = $logInformation;
    return $logInformation;
  }
  updateLogs() {
    this.logs = store.getLogs();
    if (this.$logInformation) {
      this.$logInformation.innerHTML = `
        ${this.logs.map((log) => `<div>${log}</div>`).join("")}
      `;
    }
  }
}
