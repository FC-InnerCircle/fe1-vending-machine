import Component from "../core/component.ts";

interface Props {
  logs: Array<string>;
}

export default class Log extends Component<Props> {
  template () {
    const {logs} = this.props;

    return logs.map(log => (`<div class="log__item">${log}</div>`)).join('');
  }
}
