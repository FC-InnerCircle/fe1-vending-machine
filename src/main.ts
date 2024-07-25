import CostInputControl from './components/cost-input-control';
import LogMessage from './components/log-message';
import LogMessageDisplay from './components/log-message-display';
import VendingMachine from './components/vending-machine';
import VendingMachineControlPanel from './components/vending-machine-control-panel';
import VendingMachineCostDisplay from './components/vending-machine-cost-display';
import VendingMachineProduct from './components/vending-machine-product';
import VendingMachineProductPanel from './components/vending-machine-product-panel';
import VendingMachineProducts from './components/vending-machine-products';

customElements.define('vending-machine', VendingMachine);

customElements.define(
  'vending-machine-product-panel',
  VendingMachineProductPanel
);
customElements.define(
  'vending-machine-price-display',
  VendingMachineCostDisplay
);
customElements.define('vending-machine-products', VendingMachineProducts);
customElements.define('vending-machine-product', VendingMachineProduct);

customElements.define(
  'vending-machine-control-panel',
  VendingMachineControlPanel
);
customElements.define('cost-input-control', CostInputControl);
customElements.define('log-message-display', LogMessageDisplay);
customElements.define('log-message', LogMessage);
