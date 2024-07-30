export const initPriceRefund = (state, setState) => {
    const refundButton = document.getElementById('refundButton');

    refundButton.addEventListener("click", () => {

        setState((currentState) => {

            return { inputValue: 0, price: 0, textLog: currentState.price > 0 ? [...currentState.textLog, `금액을 반환합니다.`] : [...currentState.textLog, `반환 금액 부족`] }
        })

    })
}