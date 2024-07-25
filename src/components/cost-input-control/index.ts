import {
  VendingMachineState,
  vendingMachineActions,
  vendingMachineStore,
} from '../../stores/vendingMachine';
import { isInteger } from '../../utils/validate';

class CostInputControl extends HTMLElement {
  private shadow;

  static get observedAttributes() {
    return ['cost'];
  }

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
    vendingMachineStore.subscribe(this.update.bind(this));
  }

  connectedCallback() {
    this.render();
    this.attachEvent();
  }

  attributeChangedCallback() {
    this.render();
    this.attachEvent();
  }

  handleChangeCost(event: Event) {
    const { value } = event.target as HTMLInputElement;
    if (!isInteger(value)) {
      const { cost } = vendingMachineStore.getState();
      vendingMachineActions.inputCost(cost);
    } else {
      vendingMachineActions.inputCost(parseInt(value) || 0);
    }
  }

  handleInsert() {
    const { cost } = vendingMachineStore.getState();

    if (cost > 0) {
      vendingMachineActions.insertCost();
    }
  }

  handleReturn() {
    const { totalCost } = vendingMachineStore.getState();

    if (totalCost > 0) {
      vendingMachineActions.returnCost();
    }
  }

  attachEvent() {
    const input = this.shadow.querySelector('.cost-input');
    const insertButton = this.shadow.querySelector('.insert-button');
    const returnButton = this.shadow.querySelector('.return-button');

    input?.addEventListener('input', this.handleChangeCost);
    insertButton?.addEventListener('click', this.handleInsert);
    returnButton?.addEventListener('click', this.handleReturn);
  }

  update(state: VendingMachineState) {
    const input = this.shadow.querySelector('.cost-input');
    if (!input) return;
    (input as HTMLInputElement).value = (state.cost || '').toString();
  }

  render() {
    const { cost } = vendingMachineStore.getState();
    this.shadow.innerHTML = `
      <div>
        <input class="cost-input" value="${cost || ''}"/>
        <button class="insert-button">투입</button>
        <button class="return-button">반환</button>
      </div>
    `;
  }
}

export default CostInputControl;
