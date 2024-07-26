import React from "react";

interface BalanceDisplayProps {
  children: React.ReactNode;
}

const BalanceDisplay = ({ children }: BalanceDisplayProps) => {
  return (
    <div className="w-full h-10 flex mb-8 justify-center items-center bg-white border-2 border-black">
      {children}
    </div>
  );
};

export default BalanceDisplay;
