import { createContext } from "react";
import { Product } from "../features";

interface VendingMachineContext {
  balance: string;
  history: string[];
  inputBalance: string;
  handleInputBalance: (e: React.ChangeEvent<HTMLInputElement>) => void;
  insertBalance: () => void;
  refundBalance: () => void;
  showProductPrice: (name: string) => void;
  hideProductPrice: (name: string) => void;
  buyProduct: (name: string) => void;
  products: Product[];
}

const VendingMachineContext = createContext<VendingMachineContext>(
  {} as VendingMachineContext
);

export default VendingMachineContext;
