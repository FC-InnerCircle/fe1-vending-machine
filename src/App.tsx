import React from 'react';
import styled from 'styled-components';

const App: React.FC = () => {

    return (
        <Container>
            <VendingMachine>
                <Screen type="text" value={''} readOnly />
                <Buttons>
                    {[300, 400, 500, 600, 700, 800, 900, 1000, 1100].map((price) => (
                        <Button key={price} onClick={()=>{}}>FE{price}</Button>
                    ))}
                </Buttons>
            </VendingMachine>
            <Controls>
                <ControlDisplay>
                    <InputDisplay id="money" name="money" type="text" placeholder="자판기에 돈을 투입해 주세요" />
                    <ControlButton type="submit">투입</ControlButton>
                    <ControlButton type="button" onClick={()=>{}}>반환</ControlButton>
                </ControlDisplay>
                <MessageBox readOnly value={''} />
            </Controls>
        </Container>
    );
};

export default App;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  width: 90%;
  height: 60%;
  margin: 0 auto;
`;

const VendingMachine = styled.div`
  border: 2px solid black;
  width: 60%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Controls = styled.div`
  width: 40%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Screen = styled.input`
  text-align: right;
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

const ControlDisplay = styled.form`
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