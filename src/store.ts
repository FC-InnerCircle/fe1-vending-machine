import { Item, items } from "./components/VendingItems";

interface Control {
  type: "buy" | "insert" | "return";
  value?: number | Item;
}
type Listener = () => void;

class Store {
  balance: number = 0;
  logs: string[] = [];
  control: Control | undefined = undefined;
  listeners: Listener[] = [];

  setControl(newValue: Control) {
    this.control = newValue;
    const { type, value } = newValue;
    if (type === "insert" && value) {
      this.balance = this.balance + Number(value);
      this.logs.push(`${newValue.value}원이 투입되었습니다.`);
    } else if (type === "return") {
      this.logs.push(`${this.balance}원을 반환합니다.`);
      this.balance = 0;
    } else if (type === "buy" && value && typeof value !== "number") {
      this.balance = this.balance - value.price;
      this.logs.push(`${value.label}을 구매 했습니다.`);

      const min = Math.min(...items.map((v) => v.price));
      if (this.balance < min) {
        this.logs.push(`${this.balance}원을 반환합니다.`);
        this.balance = 0;
      }
    }
    this.notify();
  }
  private notify() {
    this.listeners.forEach((listener) => listener());
  }
  getBalance() {
    return this.balance;
  }

  setBalance(newValue: number) {
    this.balance = newValue;
  }

  getLogs() {
    return this.logs;
  }

  setLogs(newValue: string[]) {
    this.logs = newValue;
  }

  subscribe(listener: Listener) {
    this.listeners.push(listener);
  }

  unsubscribe(listener: Listener) {
    this.listeners = this.listeners.filter((l) => l !== listener);
  }
}

export const store = new Store();
