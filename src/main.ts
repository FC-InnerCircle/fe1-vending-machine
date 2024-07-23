import "./style.css";
import { VendingMachine } from "./vending-machine";

const app = document.querySelector<HTMLDivElement>("#app")!;

const vendingMachine = new VendingMachine(app);
