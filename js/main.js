document.addEventListener("DOMContentLoaded", () => {
    const inputDisplay = document.querySelector(".input-display");
    const messageBox = document.querySelector(".message-box");
    const buttons = document.querySelectorAll(".button");
    const screenInput = document.getElementById("screen");
    const insertButton = document.getElementById("insert");
    const refundButton = document.getElementById("refund");
    const productMinimum = Math.min(...Array.from(buttons).map(button => parseInt(button.value)));
    let totalInserted = 0;

    function formatCurrency(value) {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    function unFormatCurrency(value) {
        return parseInt(value.toString().replaceAll(',',''));
    }
    function updateScreen() {
        screenInput.value = formatCurrency(totalInserted);
    }
    function updateMesaageBox(amount,text) {
        if(amount){
            messageBox.value += `\n${formatCurrency(amount)}원을${text}`;
        }else{
            messageBox.value += `\n${text}`;
        }
    }

    inputDisplay.addEventListener("input", () => {
        let value = inputDisplay.value.replace(/,/g, '');
        if (!isNaN(value) && value !== "" && value > 0) {
            inputDisplay.value = formatCurrency(value);
        }else{
            inputDisplay.value = formatCurrency('');
        }
    });
    inputDisplay.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            insertButton.click();
        }
    });
    insertButton.addEventListener("click", () => {
        const amount = unFormatCurrency(inputDisplay.value);
        if (amount > 0) {
            totalInserted += amount;
            updateMesaageBox(amount,"투입했습니다.");
            updateScreen();
            inputDisplay.value = "";
        }
    });
    refundButton.addEventListener("click", () => {
        if (totalInserted > 0) {
            updateMesaageBox(totalInserted,"반환했습니다.");
            totalInserted = 0;
            updateScreen();
            inputDisplay.value = "";
        }else {
            updateMesaageBox('',"반환할 금액이 없습니다.");
        }
    });
    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const feAmount = parseInt(button.value);
            if (totalInserted >= feAmount) {
                totalInserted -= feAmount;
                updateScreen();
                updateMesaageBox('',`FE${feAmount}을 구매했습니다.`);
                if (totalInserted > 0 && totalInserted < productMinimum) {
                    updateMesaageBox(totalInserted,`반환합니다.`);
                    totalInserted = 0;
                    updateScreen();
                }
            } else {
                updateMesaageBox('',"잔액이 부족합니다.");
            }
        });
    });
});
