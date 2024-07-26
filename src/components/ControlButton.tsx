import React, { useContext } from 'react';
import styled from 'styled-components';
import { VendingMachineContext } from '../context/VendingMachineContext';

interface ControlButtonProps {
    text: string;
    actionType: 'INSERT' | 'REFUND';
    inputValue: number;
    setInputValue: (value: number) => void;
}

const ControlButton: React.FC<ControlButtonProps> = ({ text, actionType, inputValue, setInputValue }) => {
    const { state, dispatch } = useContext(VendingMachineContext)!;

    const handleButtonClick = () => {
        if (actionType === 'INSERT' && inputValue > 0) {
            dispatch({ type: 'INSERT', inputValue });
            dispatch({ type: 'LOG', inputValue: `${inputValue.toLocaleString()}원을 투입했습니다.` });
            setInputValue(0);
        } else if (actionType === 'REFUND' && state.totalInserted > 0) {
            dispatch({ type: 'LOG', inputValue: `${state.totalInserted.toLocaleString()}원을 반환했습니다.` });
            dispatch({ type: 'REFUND' });
        }
    };

    return <Button onClick={handleButtonClick}>{text}</Button>;
};

export default ControlButton;

const Button = styled.button`
  background-color: #D3D3D3;
  padding: 1em 1em;
  margin: 0 3px;
  white-space: nowrap;
`;
