import Store from '../lib/Store';

interface InsertLog {
  type: 'insert';
  cost: number;
}

interface ReturnLog {
  type: 'return';
  cost: number;
}

interface PurchaseLog {
  type: 'purchase';
  productName: string;
}

export type Log = InsertLog | ReturnLog | PurchaseLog;

export interface VendingMachineState {
  totalCost: number;
  tempCost: number;
  cost: number;
  logs: Log[];
}

interface VendingMachineAction {
  insertCost: () => void;
  returnCost: () => void;
  inputCost: (cost: number) => void;
  purchase: (productName: string, productCost: number) => void;
  displayInsufficientCost: (productCost: number) => void;
}

export const vendingMachineStore = new Store<VendingMachineState>({
  totalCost: 0,
  tempCost: 0,
  cost: 0,
  logs: [],
});

export const vendingMachineActions: VendingMachineAction = {
  insertCost: () => {
    const { totalCost, cost, logs } = vendingMachineStore.getState();
    vendingMachineStore.setState({
      totalCost: totalCost + cost,
      cost: 0,
      logs: [...logs, { type: 'insert', cost }],
    });
  },
  returnCost: () => {
    const { totalCost, logs } = vendingMachineStore.getState();
    vendingMachineStore.setState({
      totalCost: 0,
      logs: [...logs, { type: 'return', cost: totalCost }],
    });
  },
  inputCost: (cost: number) => {
    vendingMachineStore.setState({
      cost,
    });
  },
  purchase: (productName: string, productCost: number) => {
    const { totalCost, logs } = vendingMachineStore.getState();
    vendingMachineStore.setState({
      totalCost: totalCost - productCost,
      logs: [...logs, { type: 'purchase', productName }],
    });
  },
  displayInsufficientCost: (productCost: number) => {
    vendingMachineStore.setState({
      tempCost: productCost,
    });
  },
};
