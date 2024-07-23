import BaseComponent, { ComponentProps } from "../BaseComponent/BaseComponent";

type InputProps = ComponentProps & {
  type?: string;
  placeholder?: string | number;
  value?: string | number;
  onChange?: (e: Event) => void;
};

export default class Input extends BaseComponent {
  constructor(props: InputProps = {}) {
    super("input", props);
  }

  render(): void {
    this.element.addEventListener("input", this.props.onChange);
    this.element.setAttribute("type", this.props.type || "text");
    this.element.setAttribute("placeholder", this.props.placeholder as string);
    this.element.setAttribute("value", this.props.value as string);
    this.element.setAttribute("min", this.props.min as string);
    this.element.setAttribute("step", this.props.step as string);
  }

  resetValue() {
    (this.element as HTMLInputElement).value = "";
  }
}
