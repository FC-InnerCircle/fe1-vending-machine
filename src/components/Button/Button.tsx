import React from "react";

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

const Button = ({ onClick, children }: ButtonProps) => {
  return (
    <button className="w-[15%] h-10 border-2 border-black" onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
