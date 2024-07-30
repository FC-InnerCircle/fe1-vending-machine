
const render = (function () {



    function priceUpdate(state) {
        const priceDisplay = document.getElementById('priceDisplay');

        priceDisplay.innerHTML = state.price.toLocaleString()


    }
    function priceInputBoxUpdate(state, setState) {

        const inputField = document.getElementById('priceInputBox');
        inputField.value = state.inputValue.toLocaleString();

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

        priceUpdate,
        priceInputBoxUpdate,
        viewTextLog
    };
})();