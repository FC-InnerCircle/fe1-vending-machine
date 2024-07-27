import {FormEvent} from "react";

interface Props {
  amount: number;
  onAmountChange?: (amount: number) => void;
  onDeposit?: (amount: number) => void;
  onWithdraw?: (amount: number) => void;
}

function CoinSlot({amount, onAmountChange, onDeposit, onWithdraw}: Props) {
  const handleChange = () => {
    onAmountChange?.(amount);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    onDeposit?.(amount);
  };

  const handleDeposit = () => {
    onWithdraw?.(amount);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="number" value={amount} onChange={handleChange}/>
      <button type="submit">투입</button>
      <button type="button" onClick={handleDeposit}>반환</button>
    </form>
  );
}

export default CoinSlot;
