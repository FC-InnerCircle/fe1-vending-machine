import React, { useContext } from 'react';
import styled from 'styled-components';
import { formatCurrency, productPrice } from '../reducers/reducer';
import { VendingMachineContext } from '../context/VendingMachineContext';
import VendingMachineButton from './vendingMachineButton';

const VendingMachine: React.FC = () => {
    const { state } = useContext(VendingMachineContext)!;
    return (
        <Container>
            <Screen type="text" value={formatCurrency(state.displayValue)} readOnly />
            <Buttons>
                {productPrice.map((price) => (
                    <VendingMachineButton key={price} price={price} />
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
