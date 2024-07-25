export default class LogInformation {
  constructor() {}

  render(): HTMLElement {
    const $logInformation = document.createElement("div");
    $logInformation.textContent = "logInformation";
    return $logInformation;
  }
}
