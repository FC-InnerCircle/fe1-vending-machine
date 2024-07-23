
const render = (function () {
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
                        setState({ price: state.price - item.price });
                    } else if (state.price < state.minPrice) {
                        setState({ price: 0, textLog: [...state.textLog, `최소물건가격(${item.price})보다 현재금액(${state.price})이 부족합니다. 잔돈 반환합니다.`] })
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
        console.log("state:", state)
        priceDisplay.innerHTML = state.price.toLocaleString()


    }



    return {
        update,
        priceUpdate
    };
})();