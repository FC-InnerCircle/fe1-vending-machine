document.addEventListener("DOMContentLoaded", () => {
    const inputDisplay = document.querySelector(".input-display");
    const messageBox = document.querySelector(".message-box");
    const screenInput = document.querySelector(".screen");
    const insertButton = document.getElementById("insert");
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
            messageBox.value += `\n${formatCurrency(amount)}원을 투입했습니다.`;
            updateScreen();
            inputDisplay.value = "";
        }
    });
});
