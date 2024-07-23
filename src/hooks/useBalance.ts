import { useState } from "react";

const useBalance = () => {
  const [balance, setBalance] = useState(0);

  const refund = () => {
    setBalance(0);
  };

  const insert = (amount: number) => {
    setBalance(balance + amount);
  };

  const isBalanceLowProductPrice = (productPrice: number) => {
    return balance < productPrice;
  };

  const subtract = (amount: number) => {
    if (isBalanceLowProductPrice(amount)) {
      return -1;
    }

    setBalance(balance - amount);
    return balance;
  };

  const balanceWithComma = () => {
    return balance.toLocaleString("ko-KR");
  };

  return {
    refund,
    insert,
    isBalanceLowProductPrice,
    subtract,
    balanceWithComma,
  };
};

export default useBalance;
