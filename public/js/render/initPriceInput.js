export const initPriceInput = (state, setState) => {
    const handleInput = (event) => {

        let value = event.target.value.replace(/,/g, '');

        if (!isNaN(value)) {
            let numberValue = Number(value);
            setState({ inputValue: numberValue });

        } else {

            setState({ inputValue: state.inputValue });

        }
    }



    const inputField = document.getElementById('priceInputBox');


    inputField.addEventListener('input', handleInput);

}