interface Props {
  price: number;
  onClick?: (price: number) => void;
}

function PurchaseButton({price, onClick}: Props) {
  const handleClick = () => {
    onClick?.(price);
  }

  return <button type="button" onClick={handleClick}>FE{price}</button>;
}

export default PurchaseButton;
