import { PRICE_LIST } from "./vending-machine";

interface State {
  totalAmount: number;
  logs: string[];
}

// 액션 타입 정의
type Action =
  | { type: "INSERT_MONEY"; value: number }
  | { type: "PURCHASE_ITEM"; price: number }
  | { type: "RETURN_MONEY" };

// 초기 상태 정의
export const initialVendingMachineState: State = {
  totalAmount: 0,
  logs: [],
};

export const vendingMachineReducer = (state: State, action: Action) => {
  switch (action.type) {
    case "INSERT_MONEY": {
      if (action.value <= 0) return state;

      const newTotalAmount = state.totalAmount + action.value;

      if (newTotalAmount > Number.MAX_SAFE_INTEGER) {
        return {
          ...state,
          logs: [
            ...state.logs,
            `입력 금액이 너무 큽니다. 현재 총 금액: ${state.totalAmount.toLocaleString()}원`,
          ],
        };
      }

      return {
        ...state,
        totalAmount: newTotalAmount,
        logs: [
          ...state.logs,
          `${action.value.toLocaleString()}원을 넣었습니다.`,
        ],
      };
    }
    case "PURCHASE_ITEM": {
      const price = action.price;
      if (state.totalAmount < price) return state;

      const rest = state.totalAmount - price;
      const newLogs = [...state.logs, `FE${price}를 구매하였습니다.`];

      if (rest !== 0 && rest < Math.min(...PRICE_LIST)) {
        newLogs.push(`잔돈 ${rest.toLocaleString()}원을 반환합니다.`);
        return {
          ...state,
          totalAmount: 0,
          logs: newLogs,
        };
      }

      return {
        ...state,
        totalAmount: rest,
        logs: newLogs,
      };
    }
    case "RETURN_MONEY": {
      if (state.totalAmount === 0) return state;

      return {
        ...state,
        totalAmount: 0,
        logs: [
          ...state.logs,
          `잔돈 ${state.totalAmount.toLocaleString()}원을 반환합니다.`,
        ],
      };
    }
    default:
      return state;
  }
};
