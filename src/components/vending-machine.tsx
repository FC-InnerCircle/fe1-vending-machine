import { ChangeEvent, useReducer, useState } from "react";

const PRICE_LIST = [300, 400, 500, 600, 700, 800, 900, 1000, 1100];

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
const initialState: State = {
  totalAmount: 0,
  logs: [],
};

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "INSERT_MONEY": {
      const newTotalAmount = state.totalAmount + action.value;
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

      if (rest < Math.min(...PRICE_LIST)) {
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
export function VendingMachine() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [value, setValue] = useState<string>("");

  const onChangeNumber = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const positiveNumber = value.replace(/[^0-9]/g, "");
    setValue(positiveNumber);
  };

  const onInsert = () => {
    dispatch({ type: "INSERT_MONEY", value: Number(value) });
    setValue("");
  };

  const onPurchase = (price: number) => {
    dispatch({ type: "PURCHASE_ITEM", price });
  };

  const onReturn = () => {
    dispatch({ type: "RETURN_MONEY" });
  };

  return (
    <div>
      <div>
        <input
          type="number"
          name="금액"
          placeholder="금액 입력"
          value={value}
          onChange={onChangeNumber}
        />
        <button onClick={onInsert}>투입</button>
        <button onClick={onReturn}>반환</button>
      </div>
      <div data-testid="logs" className="logs">
        {state.logs.map((log, index) => (
          <div key={index + log}>{log}</div>
        ))}
      </div>

      <div data-testid="display" className="display">
        {state.totalAmount.toLocaleString()}
      </div>
      <div>
        {PRICE_LIST.map((price) => (
          <button
            key={price}
            onClick={() => onPurchase(price)}
            data-testid="product"
            data-price={price}
          >
            {`FE${price}`}
          </button>
        ))}
      </div>
    </div>
  );
}
