import { useContext } from "react";
import VendingMachineContext from "../../context/VendingMachineContext";
import { BalanceDisplay } from "../../components";

const BalanceDisplayContainer = () => {
  const { balance } = useContext(VendingMachineContext);

  return <BalanceDisplay>{balance}</BalanceDisplay>;
};

export default BalanceDisplayContainer;
