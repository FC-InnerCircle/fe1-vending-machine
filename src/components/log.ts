export class Log {
  content: string;

  constructor(content: string) {
    this.content = content;
  }

  render(): HTMLElement {
    const logElement = document.createElement("li");
    logElement.className = "log";
    logElement.textContent = this.content;
    return logElement;
  }
}
