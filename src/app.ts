import Component from "./core/component.ts";
import Amount from "./components/amount.ts";

export default class App extends Component {
  template () {
    return `
      <div>
        <h1>Vending Machine</h1>
        <div class="amount"></div>
      </div>
    `;
  }

  protected mounted() {
    const amount = document.querySelector('.amount') as HTMLInputElement;

    new Amount(amount, {});
  }
}
