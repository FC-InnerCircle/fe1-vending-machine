import { useContext } from "react";
import VendingMachineContext from "../../context/VendingMachineContext";
import { BalanceInput, Button } from "../../components";

const BalanceControlContainer = () => {
  const { insertBalance, refundBalance, inputBalance, handleInputBalance } =
    useContext(VendingMachineContext);

  return (
    <div className="flex justify-between">
      <BalanceInput onChange={handleInputBalance} value={inputBalance} />
      <Button onClick={insertBalance}>투입</Button>
      <Button onClick={refundBalance}>반환</Button>
    </div>
  );
};

export default BalanceControlContainer;
