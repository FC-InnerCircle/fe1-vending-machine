import { ChangeEvent, useReducer, useState } from "react";
import {
  initialVendingMachineState,
  vendingMachineReducer,
} from "./vending-machine.reducer";
import { VendingMachineLogs } from "./vending-machine-logs";
import { VendingMachineControlPanel } from "./vending-machine-controll-panel";
import { VendingMachineDisplayPanel } from "./vending-machine-display-panel";
import { VendingMachineProduct } from "./vending-machine-product";

export const PRICE_LIST = [300, 400, 500, 600, 700, 800, 900, 1000, 1100];

export function VendingMachine() {
  const [state, dispatch] = useReducer(
    vendingMachineReducer,
    initialVendingMachineState
  );
  const [value, setValue] = useState<string>("");
  const [currentPrice, setCurrentPrice] = useState<number | null>(null);
  const displayScreen =
    currentPrice !== null && currentPrice > state.totalAmount
      ? currentPrice.toLocaleString()
      : state.totalAmount.toLocaleString();

  const onChangeNumber = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const positiveNumber = value.replace(/[^0-9]/g, "");
    setValue(positiveNumber);
  };

  const onInsert = () => {
    const amount = Number(value);
    if (amount === 0) return;

    dispatch({ type: "INSERT_MONEY", value: Number(value) });
    setValue("");
  };

  const onPurchase = (price: number) => {
    dispatch({ type: "PURCHASE_ITEM", price });
  };

  const onReturn = () => {
    dispatch({ type: "RETURN_MONEY" });
  };

  const handleMouseDown = (price: number) => {
    if (state.totalAmount < price) {
      setCurrentPrice(price);
    }
  };

  const handleMouseUp = () => {
    setCurrentPrice(null);
  };

  return (
    <div>
      <VendingMachineControlPanel
        value={value}
        onChangeNumber={onChangeNumber}
        onInsert={onInsert}
        onReturn={onReturn}
      />
      <VendingMachineLogs logs={state.logs} />
      <VendingMachineDisplayPanel displayText={displayScreen} />

      <div>
        {PRICE_LIST.map((price) => (
          <VendingMachineProduct
            key={`FE${price}`}
            onClick={() => onPurchase(price)}
            onMouseDown={() => handleMouseDown(price)}
            onMouseUp={handleMouseUp}
            data-testid="product"
            data-price={price}
            price={price}
          />
        ))}
      </div>
    </div>
  );
}
