import React, { useContext } from 'react';
import styled from 'styled-components';
import { formatCurrency, productPrice } from '../reducers/reducer';
import { VendingMachineContext } from '../context/AppContext';

interface VendingMachineButtonProps {
    price: number;
}

const VendingMachineButton: React.FC<VendingMachineButtonProps> = ({ price }) => {
    const { state, dispatch } = useContext(VendingMachineContext)!;
    const handleOnMouseDownPurchase = () => {
        const { totalInserted } = state;
        if (totalInserted < price) {
            dispatch({ type: 'DISPLAY', inputValue: price });
        }
    };
    const handleOnMouseUpPurchase = () => {
        const { totalInserted } = state;
        const remainingAmount = totalInserted - price;
        if (totalInserted >= price) {
            dispatch({ type: 'LOG', inputValue: `FE${price}을 구매했습니다.` });
            dispatch({ type: 'PURCHASE', inputValue: price });
            dispatch({ type: 'DISPLAY', inputValue: remainingAmount });
            if (remainingAmount > 0 && remainingAmount < Math.min(...productPrice)) {
                dispatch({ type: 'LOG', inputValue: `${formatCurrency(remainingAmount)}원을 반환합니다.` });
                dispatch({ type: 'REFUND' });
            }
        } else {
            dispatch({ type: 'DISPLAY', inputValue: totalInserted });
        }
    };
    return (
        <Button onMouseUp={handleOnMouseUpPurchase} onMouseDown={handleOnMouseDownPurchase}>
            FE{price}
        </Button>
    );
};

export default VendingMachineButton;

const Button = styled.button`
  background-color: #87CEFA;
  text-align: center;
  padding: 30%;
  font-size: 18px;
  cursor: pointer;
  border: 2px solid black;
  box-sizing: border-box;
  white-space: nowrap;

  &:hover {
    background-color: #00BFFF;
  }

  &:active {
    background-color: #1E90FF;
  }
`;
