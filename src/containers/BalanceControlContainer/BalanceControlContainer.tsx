import { useContext } from "react";
import VendingMachineContext from "../../context/VendingMachineContext";
import { BalanceInput, Button } from "../../components";

const BalanceControlContainer = () => {
  const { insertBalance, refundBalance, inputBalance, handleInputBalance } =
    useContext(VendingMachineContext);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    insertBalance();
  };

  return (
    <form onSubmit={handleSubmit} className="flex justify-between">
      <BalanceInput onChange={handleInputBalance} value={inputBalance} />
      <Button type="submit">투입</Button>
      <Button type="button" onClick={refundBalance}>
        반환
      </Button>
    </form>
  );
};

export default BalanceControlContainer;
