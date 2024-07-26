import React, { useContext, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { formatCurrency } from '../reducers/reducer';
import { VendingMachineContext } from '../context/AppContext';
import ControlButton from './ControlButton';

const Controls: React.FC = () => {
    const messageBoxRef = useRef<HTMLTextAreaElement>(null);
    const [inputValue, setInputValue] = useState(0);
    const { state } = useContext(VendingMachineContext)!;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/,/g, '');
        if (!isNaN(Number(value))) {
            setInputValue(Number(value));
        }
    };

    useEffect(() => {
        if (messageBoxRef.current) {
            messageBoxRef.current.scrollTop = messageBoxRef.current.scrollHeight;
        }
    }, [state.message]);

    return (
        <Container>
            <ControlDisplay>
                <InputDisplay
                    id="money"
                    name="money"
                    type="text"
                    placeholder="자판기에 돈을 투입해 주세요"
                    value={inputValue ? formatCurrency(inputValue) : ''}
                    onChange={handleInputChange}
                />
                <ControlButton text="투입" inputValue={inputValue} actionType="INSERT" setInputValue={setInputValue} />
                <ControlButton text="반환" inputValue={inputValue} actionType="REFUND" setInputValue={setInputValue} />
            </ControlDisplay>
            <MessageBox readOnly ref={messageBoxRef} value={state.message} />
        </Container>
    );
};

export default Controls;

const Container = styled.div`
  width: 40%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ControlDisplay = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  width: 100%;
`;

const InputDisplay = styled.input`
  width: 100%;
  text-align: right;
  font-size: 15px;
  padding: 1em;
  border: 2px solid black;
  box-sizing: border-box;
  margin-right: 10px;
`;

const MessageBox = styled.textarea`
  border: 2px solid black;
  padding: 10px;
  width: 100%;
  height: 100%;
  resize: none;
  box-sizing: border-box;
  flex-grow: 1;
`;
