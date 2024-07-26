import React from 'react';
import styled from 'styled-components';
import VendingMachine from './components/VendingMachine';
import Controls from './components/Controls';
import {VendingMachineProvider} from './context/VendingMachineContext';

const App: React.FC = () => {
    return (
        <AppContainer>
            <VendingMachineProvider>
                <VendingMachine/>
                <Controls/>
            </VendingMachineProvider>
        </AppContainer>
    );
};

export default App;

const AppContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  width: 60%;
  margin: 10% auto;
`;
