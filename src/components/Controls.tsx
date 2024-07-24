import React from 'react';
import styled from 'styled-components';
import {formatCurrency} from "../reducers/reducer";

interface ControlsProps {
    inputValue: number;
    message: string[];
    onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onInsertButton: () => void;
    onRefundButton: () => void;
}

const Controls: React.FC<ControlsProps> = ({ inputValue, message, onInputChange, onInsertButton, onRefundButton }) => {
    return (
        <Container>
            <ControlDisplay>
                <InputDisplay
                    id="money"
                    name="money"
                    type="text"
                    placeholder="자판기에 돈을 투입해 주세요"
                    value={inputValue ? formatCurrency(inputValue) : ''}
                    onChange={onInputChange}
                />
                <ControlButton type="button" onClick={onInsertButton}>투입</ControlButton>
                <ControlButton type="button" onClick={onRefundButton}>반환</ControlButton>
            </ControlDisplay>
            <MessageBox readOnly value={message.join('\n')} />
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
  font-size: 24px;
  padding: 10px;
  border: 2px solid black;
  box-sizing: border-box;
  margin-right: 10px;
`;

const ControlButton = styled.button`
  background-color: #D3D3D3;
  padding: 10px 20px;
  margin: 0 5px;
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
