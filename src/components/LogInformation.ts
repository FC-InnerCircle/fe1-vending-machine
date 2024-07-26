export default class LogInformation {
  constructor() {}

  render(): HTMLElement {
    const $logInformation = document.createElement("div");
    $logInformation.className =
      "border-2 border-inherit rounded overflow-y-auto overflow-x-clip";
    $logInformation.style.height = "calc(100% - 42px)";
    return $logInformation;
  }
}
