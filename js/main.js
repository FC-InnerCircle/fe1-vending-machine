document.addEventListener("DOMContentLoaded", () => {
    const inputDisplay = document.querySelector(".input-display");
    const messageBox = document.querySelector(".message-box");
    const screenInput = document.getElementById("screen");
    const insertButton = document.getElementById("insert");
    const refundButton = document.getElementById("refund");
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
    function updateMesaageBox(inputText) {
        messageBox.value += `\n${inputText}`;
    }

    inputDisplay.addEventListener("input", () => {
        let value = inputDisplay.value.replace(/,/g, ''); // Remove existing commas
        if (!isNaN(value) && value !== "") {
            inputDisplay.value = formatCurrency(value);
        }
    });
    insertButton.addEventListener("click", () => {
        const amount = unFormatCurrency(inputDisplay.value);
        if (amount > 0) {
            totalInserted += amount;
            updateMesaageBox(`${formatCurrency(amount)}원을 투입했습니다.`);
            updateScreen();
            inputDisplay.value = "";
        }
    });
    refundButton.addEventListener("click", () => {
        if (totalInserted > 0) {
            updateMesaageBox(`${formatCurrency(totalInserted)}원을 반환했습니다.`);
            totalInserted = 0;
            updateScreen();
            inputDisplay.value = "";
        }else {
            messageBox.value += `\n반환할 금액이 없습니다.`;
        }
    });
});
