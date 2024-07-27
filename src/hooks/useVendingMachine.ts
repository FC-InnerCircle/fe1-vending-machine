import React, { useState } from "react";
import type { VendingMachine } from "../features";
import formatNumberWithCommas from "../utils/formatNumberWithCommas";

const useVendingMachine = (vendingMachine: VendingMachine) => {
  const [balance, setBalance] = useState("0");
  const [history, setHistory] = useState<string[]>([]);
  const [inputBalance, setInputBalance] = useState("");

  const renderBalanceAndHistory = () => {
    setBalance(vendingMachine.getBalanceWithCommas());
    setHistory(vendingMachine.getHistory());
  };

  const handleInputBalance = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;

    // 음수값 입력 방지
    if (target.value.includes("-")) {
      alert("음수값은 입력할 수 없습니다.");
      setInputBalance("");
      return;
    }

    vendingMachine.setInputBalance(target.value);
    setInputBalance(target.value);
  };

  const insertBalance = () => {
    if (Number(inputBalance) <= 0) {
      return;
    }

    vendingMachine.insertMoney(Number(inputBalance));
    setInputBalance("");
    renderBalanceAndHistory();
  };

  const refundBalance = () => {
    if (balance === "0") {
      return;
    }

    vendingMachine.refundMoney();
    renderBalanceAndHistory();
  };

  const showProductPrice = (name: string) => {
    if (vendingMachine.isLowBalance(name)) {
      const productPrice = vendingMachine.getProductPrice(name);
      setBalance(formatNumberWithCommas(productPrice));
    }
  };

  const hideProductPrice = (name: string) => {
    if (vendingMachine.isLowBalance(name)) {
      setBalance(vendingMachine.getBalanceWithCommas());
    }
  };

  const buyProduct = (name: string) => {
    vendingMachine.buyProduct(name);
    renderBalanceAndHistory();
  };

  const products = vendingMachine.getAllProduct();

  return {
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
  };
};

export default useVendingMachine;
