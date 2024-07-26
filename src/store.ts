interface Control {
  type: "buy" | "insert" | "return";
  value?: number;
}
type Listener = () => void;

class Store {
  balance: number = 0;
  logs: string[] = [];
  control: Control | undefined = undefined;
  listeners: Listener[] = [];

  setControl(newValue: Control) {
    this.control = newValue;
    if (newValue.type === "insert") {
      this.balance = this.balance + Number(newValue.value!);
      this.logs.push(`${newValue.value}원이 투입되었습니다.`);
    } else if (newValue.type === "return") {
      this.logs.push(`${this.balance}원을 반환합니다.`);
      this.balance = 0;
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
