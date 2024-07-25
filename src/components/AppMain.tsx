import React, {useContext, useState} from 'react';
import styled from 'styled-components';
import VendingMachine from './VendingMachine';
import Controls from './Controls';
import { AppContext } from '../context/AppContext';
import {formatCurrency, productPrice} from "../reducers/reducer";

const AppMain: React.FC = () => {
    const { state, dispatch } = useContext(AppContext)!;
    const [message, setMessage] = useState<string[]>([]);
    const [inputValue, setInputValue] = useState(0);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/,/g, '');
        if (!isNaN(Number(value))) {
            setInputValue(Number(value));
        }
    };
    const handleInsertButton = () => {
        if (inputValue > 0) {
            dispatch({ type: 'INSERT', inputValue });
            setMessage(prev => prev.length > 0
                ? [...prev, `${inputValue.toLocaleString()}원을 투입했습니다.`]
                : [`${inputValue.toLocaleString()}원을 투입했습니다.`]);
            setInputValue(0);
        }
    };
    const handleRefundButton = () => {
        const { totalInserted } = state;
        if (totalInserted > 0) {
            setMessage(prev => prev.length > 0
                ? [...prev, `${totalInserted.toLocaleString()}원을 반환했습니다.`]
                : [`${totalInserted.toLocaleString()}원을 반환했습니다.`]);
            dispatch({ type: 'REFUND'});
        }
    };
    const handleOnMouseUpPurchase = (price: number) => {
        const { totalInserted } = state;
        const remainingAmount = totalInserted - price;
        if (totalInserted >= price) {
            setMessage(prev => [...prev, `FE${price}을 구매했습니다.`]);
            dispatch({ type: 'PURCHASE', inputValue: price });
            dispatch({ type: 'DISPLAY', inputValue: remainingAmount });
            if (remainingAmount && remainingAmount < Math.min(...productPrice)) {
                setMessage(prev => [...prev, `${formatCurrency(remainingAmount)}원을 반환합니다.`]);
                dispatch({ type: 'REFUND' });
            }
        }else{
            dispatch({ type: 'DISPLAY', inputValue: totalInserted });
        }
    };
    const handleOnMouseDownPurchase = (price: number) => {
        const { totalInserted } = state;
        if (totalInserted < price) {
            dispatch({ type: 'DISPLAY', inputValue: price });
        }
    };

    return (
        <AppContainer>
            <VendingMachine
                formattedTotalInserted={formatCurrency(state.displayValue)}
                onMouseUpPurchase={handleOnMouseUpPurchase}
                onMouseDownPurchase={handleOnMouseDownPurchase}
            />
            <Controls
                inputValue={inputValue}
                message={message}
                onInputChange={handleInputChange}
                onInsertButton={handleInsertButton}
                onRefundButton={handleRefundButton}
            />
        </AppContainer>
    );
};

export default AppMain;

const AppContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  width: 60%;
  margin: 10% auto;
`;
