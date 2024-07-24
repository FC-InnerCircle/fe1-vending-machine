import React from 'react';
import styled from 'styled-components';

interface VendingMachineProps {
    formattedTotalInserted: string;
    onPurchase: (price: number) => void;
}

const VendingMachine: React.FC<VendingMachineProps> = ({ formattedTotalInserted, onPurchase }) => {
    return (
        <Container>
            <Screen type="text" value={formattedTotalInserted} readOnly />
            <Buttons>
                {[300, 400, 500, 600, 700, 800, 900, 1000, 1100].map((price) => (
                    <Button key={price} onClick={() => onPurchase(price)}>FE{price}</Button>
                ))}
            </Buttons>
        </Container>
    );
};

export default VendingMachine;

const Container = styled.div`
  border: 2px solid black;
  width: 60%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Screen = styled.input`
  text-align: center;
  font-size: 24px;
  padding: 10px;
  border: 2px solid black;
  box-sizing: border-box;
  margin-bottom: 20px;
`;

const Buttons = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  flex-grow: 1;
`;

const Button = styled.button`
  background-color: #87CEFA;
  text-align: center;
  padding: 20px;
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
