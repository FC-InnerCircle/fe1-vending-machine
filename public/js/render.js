
const render = (function () {

    let isInputEventListenerAdded = false;
    let isInsertButtonListenerAdded = false;
    let isRefundButtonListenerAdded = false;
    function update(state, setState) {


        const itemList = document.getElementById('itemList');

        itemList.innerHTML = '';
        itemList.innerHTML = state.items.map(item => `
            <button class="item-button px-[50px] py-[20px] bg-red-100 hover:bg-red-300 m-2 rounded" data-id="${item.id}">
              ${item.text} 
            </button>
          `).join('');

        document.querySelectorAll('.item-button').forEach(button => {
            button.addEventListener('click', function (event) {
                button.classList.add('hover:bg-red-500');
                const itemId = parseInt(event.target.dataset.id, 10);
                const item = state.items.find(item => item.id === itemId);

                if (item) {
                    if (state.price > item.price) {
                        setState({
                            price: state.price - item.price,
                            textLog: [...state.textLog,
                            `물건(${item.text})를 구매하셨습니다. 구매금액(${item.price}) 남은금액(${state.price - item.price})`]
                        });
                        if (state.price - item.price < state.minPrice) {
                            setState({ price: 0, textLog: [...state.textLog, `최소물건가격(${state.minPrice})보다 현재남은금액(${state.price})이 부족합니다. 잔돈을 반환합니다.`] })

                        }

                    }

                }
            });
            button.addEventListener('mousedown', function (event) {
                button.classList.add('hover:bg-red-500');
                const itemId = parseInt(event.target.dataset.id, 10);
                const item = state.items.find(item => item.id === itemId);

                if (item) {
                    if (state.price < item.price) {
                        const priceDisplay = document.getElementById('priceDisplay');
                        priceDisplay.innerHTML = `${item.price}`
                        // setState({ price: state.price, textLog: [...state.textLog, `물건가격(${item.price})보다 현재금액(${state.price})이 부족합니다.`] })
                    }

                }
            });


            button.addEventListener('mouseUp', function (event) {

                const itemId = parseInt(event.target.dataset.id, 10);
                const item = state.items.find(item => item.id === itemId);

                if (item) {
                    if (state.price < item.price) {
                        const priceDisplay = document.getElementById('priceDisplay');
                        priceDisplay.innerHTML = `${state.price}`
                    }

                }

            });

            button.addEventListener('mouseleave', function (evnet) {
                button.classList.remove('hover:bg-red-500');
                const itemId = parseInt(event.target.dataset.id, 10);
                const item = state.items.find(item => item.id === itemId);

                if (item) {
                    if (state.price < item.price) {
                        const priceDisplay = document.getElementById('priceDisplay');
                        priceDisplay.innerHTML = `${state.price}`
                    }

                }
            });
        });


    }
    function priceUpdate(state) {
        const priceDisplay = document.getElementById('priceDisplay');

        priceDisplay.innerHTML = state.price.toLocaleString()


    }
    function priceInputBoxUpdate(state, setState) {

        const inputField = document.getElementById('priceInputBox');


        inputField.value = state.inputValue.toLocaleString();

        const handleInput = (event) => {

            let value = event.target.value.replace(/,/g, '');

            if (!isNaN(value)) {
                let numberValue = Number(value);

                setState({ inputValue: numberValue });

            } else {

                setState({ inputValue: state.inputValue });

            }
        }



        if (!isInputEventListenerAdded) {

            isInputEventListenerAdded = true
            inputField.addEventListener('input', handleInput);
        }
    }

    function prisceInsert(state, setState) {
        const insertButton = document.getElementById('insertButton');

        if (!isInsertButtonListenerAdded) {

            isInsertButtonListenerAdded = true
            insertButton.addEventListener("click", (event) => {

                setState(currentState => {

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

    }
    function prisceRefund(state, setState) {
        const refundButton = document.getElementById('refundButton');
        if (!isRefundButtonListenerAdded) {
            isRefundButtonListenerAdded = true
            refundButton.addEventListener("click", () => {

                setState((currentState) => {

                    return { inputValue: 0, price: 0, textLog: currentState.price > 0 ? [...currentState.textLog, `금액을 반환합니다.`] : [...currentState.textLog, `반환 금액 부족`] }
                })

            })
        }

    }
    function viewTextLog(state) {
        const textLogBox = document.getElementById('textLogBox');
        textLogBox.innerHTML = state.textLog.map(item => `
            <div class="text-[15px]  leading-[23px] trackig-[-0.6px] " data-id="${item.id}">
              ${item} 
            </div>
          `).join('');
        textLogBox.scrollTop = textLogBox.scrollHeight;

    }



    return {
        update,
        priceUpdate,
        priceInputBoxUpdate,
        prisceRefund,
        prisceInsert,
        viewTextLog
    };
})();