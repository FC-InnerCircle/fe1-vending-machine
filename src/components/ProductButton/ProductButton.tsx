import React from "react";

interface ProductButtonProps {
  children: React.ReactNode;
  onMouseDown: () => void;
  onMouseUp: () => void;
  onClick: () => void;
}

const ProductButton = ({
  children,
  onMouseDown,
  onMouseUp,
  onClick,
}: ProductButtonProps) => {
  return (
    <button
      className=" bg-blue-400 hover:bg-blue-600 active:bg-blue-800 text-white select-none font-bold rounded"
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onTouchStart={onMouseDown}
      onTouchEnd={onMouseUp}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default ProductButton;
