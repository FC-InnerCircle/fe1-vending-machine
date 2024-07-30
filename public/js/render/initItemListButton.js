
export const initItemListButton = (state, setState) => {

    const itemList = document.getElementById('itemList');

    itemList.innerHTML = '';
    itemList.innerHTML = state.getState().items.map(item => `
            <button class="item-button px-[50px] py-[20px] bg-red-100 hover:bg-red-300 m-2 rounded" data-id="${item.id}">
              ${item.text} 
            </button>
          `).join('');

    document.querySelectorAll('.item-button').forEach(button => {


        button.addEventListener('click', function (event) {
            button.classList.add('hover:bg-red-500');
            const itemId = parseInt(event.target.dataset.id, 10);
            const item = state.getState().items.find(item => item.id === itemId);

            if (item) {


                setState((currentState) => {
                    if (currentState.price > item.price) {
                        return {
                            price: currentState.price - item.price,
                            textLog: [...currentState.textLog,
                            `물건(${item.text})를 구매하셨습니다. 구매금액(${item.price}) 남은금액(${currentState.price - item.price})`]
                        }
                    } else if (currentState.price - item.price < currentState.minPrice) {
                        return { price: 0, textLog: [...currentState.textLog, `최소물건가격(${currentState.minPrice})보다 현재남은금액(${currentState.price})이 부족합니다. 잔돈을 반환합니다.`] }
                    }
                })

            }


        }
        );
        button.addEventListener('mousedown', function (event) {
            button.classList.add('hover:bg-red-500');
            const itemId = parseInt(event.target.dataset.id, 10);
            const item = state.getState().items.find(item => item.id === itemId);

            if (item) {
                if (state.getState().price < item.price) {
                    const priceDisplay = document.getElementById('priceDisplay');
                    priceDisplay.innerHTML = `${item.price}`
                    // setState({ price: state.price, textLog: [...state.textLog, `물건가격(${item.price})보다 현재금액(${state.price})이 부족합니다.`] })
                }

            }
        });


        button.addEventListener('mouseUp', function (event) {

            const itemId = parseInt(event.target.dataset.id, 10);
            const item = state.getState().items.find(item => item.id === itemId);

            if (item) {
                if (state.getState().price < item.price) {
                    const priceDisplay = document.getElementById('priceDisplay');
                    priceDisplay.innerHTML = `${state.getState().price}`
                }

            }

        });

        button.addEventListener('mouseleave', function (evnet) {
            button.classList.remove('hover:bg-red-500');
            const itemId = parseInt(event.target.dataset.id, 10);
            const item = state.getState().items.find(item => item.id === itemId);

            if (item) {
                if (state.getState().price < item.price) {
                    const priceDisplay = document.getElementById('priceDisplay');
                    priceDisplay.innerHTML = `${state.getState().price}`
                }

            }
        });
    });

}

