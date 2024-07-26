import React from "react";

interface BalanceInputProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

const BalanceInput = ({ onChange, value }: BalanceInputProps) => {
  return (
    <input
      onChange={onChange}
      value={value}
      min={0}
      step={100}
      className="w-2/3 h-10 flex justify-center items-center border-2 border-black px-2"
      type="number"
    />
  );
};

export default BalanceInput;
