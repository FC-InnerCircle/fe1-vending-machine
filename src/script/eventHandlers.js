import { formatCurrency, updateScreen, updateMessageBox } from './logUtil.js';

export const inputDisplayInputListener = () => event => {
    let value = event.target.value.replace(/,/g, '');
    if (!isNaN(value) && value !== "" && value > 0) {
        event.target.value = formatCurrency(value);
    } else {
        event.target.value = "";
    }
};

export const inputDisplayKeypressListener = (button) => event => {
    if (event.key === "Enter") {
        event.preventDefault();
        button.click();
    }
};

export const insertButtonListener = (inputDisplay, messageBox, screenInput, totalInserted) => () => {
    const amount = parseInt(inputDisplay.value.replace(/,/g, ''));
    if (amount > 0) {
        totalInserted.value += amount;
        updateMessageBox(messageBox, "투입했습니다.", amount);
        updateScreen(screenInput, totalInserted.value);
        inputDisplay.value = "";
    }
};

export const refundButtonListener = (inputDisplay, messageBox, screenInput, totalInserted) => () => {
    if (totalInserted.value > 0) {
        updateMessageBox(messageBox, "반환했습니다.", totalInserted.value);
        totalInserted.value = 0;
        updateScreen(screenInput, totalInserted.value);
        inputDisplay.value = "";
    }
};

export const productButtonMouseUpListener = (screenInput, totalInserted) => () => {
    updateScreen(screenInput, totalInserted.value);
};

export const productButtonMouseDownListener = (button, screenInput) => () => {
    if(Number(screenInput.value) < button.value){
        updateScreen(screenInput, button.value);
    }
};

export const productButtonListener = (button, screenInput, messageBox, totalInserted, productMinimum) => () => {
    const feAmount = parseInt(button.value);
    if (totalInserted.value >= feAmount) {
        totalInserted.value -= feAmount;
        updateScreen(screenInput, totalInserted.value);
        updateMessageBox(messageBox, `FE${feAmount}을 구매했습니다.`);
        if (totalInserted.value > 0 && totalInserted.value < productMinimum) {
            updateMessageBox(messageBox, "반환합니다.", totalInserted.value);
            totalInserted.value = 0;
            updateScreen(screenInput, totalInserted.value);
        }
    }
};
