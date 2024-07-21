import BaseComponent, { ComponentProps } from "../BaseComponent/BaseComponent";

type DivProps = ComponentProps & {
  text?: string;
};

export default class Div extends BaseComponent {
  constructor(props: DivProps = {}) {
    super("div", props);
  }

  render() {
    this.element.textContent = this.props.text;
  }
}
