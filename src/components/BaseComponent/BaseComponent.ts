export interface ComponentProps {
  style?: Partial<CSSStyleDeclaration>;
  className?: string;
  id?: string;
  [key: string]: any;
}

export default abstract class BaseComponent {
  protected element: HTMLElement;

  constructor(tag: string = "div", protected props: ComponentProps = {}) {
    this.element = document.createElement(tag);
    this.applyProps();
  }

  protected applyProps() {
    const { style, className, id, text } = this.props;

    if (style) {
      Object.assign(this.element.style, style);
    }

    if (className) {
      this.element.className = className;
    }

    if (id) {
      this.element.id = id;
    }
  }

  abstract render(): void;

  appendTo(parent: BaseComponent | HTMLElement) {
    parent.appendChild(this.element);
    this.render();
  }

  appendChild(child: HTMLElement) {
    this.element.appendChild(child);
  }

  getElement(): HTMLElement {
    return this.element;
  }
}
