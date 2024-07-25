export default class HistoryManager {
  constructor(private history: string[] = []) {}

  addHistory(history: string) {
    this.history.push(history);
  }

  getHistory() {
    return [...this.history];
  }
}
