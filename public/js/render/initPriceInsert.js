

export const initPriceInsert = (state, setState) => {
    const insertButton = document.getElementById('insertButton');


    insertButton.addEventListener("click", (event) => {

        setState(currentState => {

            console.log("test")
            return {

                price: currentState.price + currentState.inputValue,
                inputValue: 0,
                textLog: currentState.inputValue > 0
                    ? [...currentState.textLog, `${currentState.inputValue} 금액이 충전 되었습니다.`]
                    : [...currentState.textLog]
            };

        })
    })

}