document.addEventListener("DOMContentLoaded", () => {
    const inputDisplay = document.querySelector(".input-display");
    const messageBox = document.querySelector(".message-box");
    const buttons = document.querySelectorAll(".button");
    const screenInput = document.getElementById("screen");
    const insertButton = document.getElementById("insert");
    const refundButton = document.getElementById("refund");
    const productMinimum = Math.min(...Array.from(buttons).map(button => parseInt(button.value)));
    let totalInserted = 0;

    const formatCurrency = value => Number(value).toLocaleString();
    const updateScreen = () => screenInput.value = formatCurrency(totalInserted);

    const updateMessageBox = (text, amount) => {
        const newMessage = amount ? `${formatCurrency(amount)}원을 ${text}` : `${text}`;
        messageBox.value += messageBox.value ? `\n${newMessage}` : newMessage;
    };

    const inputDisplayInputListener = () => event => {
        let value = event.target.value.replace(/,/g, '');
        if (!isNaN(value) && value !== "" && value > 0) {
            event.target.value = formatCurrency(value);
        } else {
            event.target.value = "";
        }
    };

    const inputDisplayKeypressListener = button => event => {
        if (event.key === "Enter") {
            event.preventDefault();
            button.click();
        }
    };

    const insertButtonListener = () => () => {
        const amount = parseInt(inputDisplay.value.replace(/,/g, ''));
        if (amount > 0) {
            totalInserted += amount;
            updateMessageBox("투입했습니다.", amount);
            updateScreen();
            inputDisplay.value = "";
        }
    };

    const refundButtonListener = () => () => {
        if (totalInserted > 0) {
            updateMessageBox("반환했습니다.", totalInserted);
            totalInserted = 0;
            updateScreen();
            inputDisplay.value = "";
        } else {
            updateMessageBox("반환할 금액이 없습니다.");
        }
    };

    const productButtonClickListener = button => () => {
        const feAmount = parseInt(button.value);
        if (totalInserted >= feAmount) {
            totalInserted -= feAmount;
            updateScreen();
            updateMessageBox(`FE${feAmount}을 구매했습니다.`);
            if (totalInserted > 0 && totalInserted < productMinimum) {
                updateMessageBox("반환합니다.", totalInserted);
                totalInserted = 0;
                updateScreen();
            }
        }
    };

    const setupEventListeners = () => {
        inputDisplay.addEventListener("input", inputDisplayInputListener());
        inputDisplay.addEventListener("keypress", inputDisplayKeypressListener(insertButton));
        insertButton.addEventListener("click", insertButtonListener());
        refundButton.addEventListener("click", refundButtonListener());
        buttons.forEach(button => button.addEventListener("click", productButtonClickListener(button)));
    };

    setupEventListeners();
});
