import React from "react";
import VendingMachineContext from "../context/VendingMachineContext";
import useVendingMachine from "../hooks/useVendingMachine";

interface VendingMachineProviderProps {
  children: React.ReactNode;
}

const VendingMachineProvider = ({ children }: VendingMachineProviderProps) => {
  const {
    balance,
    history,
    inputBalance,
    handleInputBalance,
    insertBalance,
    refundBalance,
    showProductPrice,
    hideProductPrice,
    buyProduct,
    products,
  } = useVendingMachine();

  return (
    <VendingMachineContext.Provider
      value={{
        balance,
        history,
        inputBalance,
        handleInputBalance,
        insertBalance,
        refundBalance,
        showProductPrice,
        hideProductPrice,
        buyProduct,
        products,
      }}
    >
      {children}
    </VendingMachineContext.Provider>
  );
};

export default VendingMachineProvider;
