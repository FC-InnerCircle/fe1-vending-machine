import BaseComponent, { ComponentProps } from "../BaseComponent/BaseComponent";

export type ButtonProps = ComponentProps & {
  text?: string;
  onClick?: () => void;
  onMouseDown?: () => void;
  onMouseUp?: () => void;
};

export default class Button extends BaseComponent {
  constructor(props: ButtonProps = {}) {
    super("button", props);
  }

  render(): void {
    this.element.textContent = this.props.text;
    this.element.addEventListener("click", this.props.onClick);
    this.element.addEventListener("mousedown", this.props.onMouseDown);
    this.element.addEventListener("mouseup", this.props.onMouseUp);
  }
}
