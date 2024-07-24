import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import VendingMachine from './VendingMachine';
import Controls from './Controls';
import { AppContext } from '../context/AppContext';
import {formatCurrency} from "../reducers/reducer";

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
        const totalValue = state.totalInserted;
        if (totalValue > 0) {
            setMessage(prev => prev.length > 0
                ? [...prev, `${totalValue.toLocaleString()}원을 반환했습니다.`]
                : [`${totalValue.toLocaleString()}원을 반환했습니다.`]);
            dispatch({ type: 'REFUND'});
        }
    };

    return (
        <AppContainer>
            <VendingMachine
                formattedTotalInserted={formatCurrency(state.totalInserted)}
                onPurchase={()=>{}}
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
  width: 90%;
  height: 60%;
  margin: 0 auto;
`;
