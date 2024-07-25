import {
    inputDisplayInputListener,
    inputDisplayKeypressListener,
    insertButtonListener,
    refundButtonListener,
    productButtonListener
} from './eventHandlers.js';

export const createButtons = () => {
    const buttonValues = [300, 400, 500, 600, 700, 800, 900, 1000, 1100];
    const buttonsContainer = document.querySelector('.buttons');

    buttonValues.forEach(value => {
        const button = document.createElement('button');
        button.className = 'button';
        button.value = value;
        button.textContent = `FE${value}`;
        buttonsContainer.appendChild(button);
    });
};

export const setupEventListeners = () => {
    const inputDisplay = document.querySelector(".input-display");
    const messageBox = document.querySelector(".message-box");
    const buttons = document.querySelectorAll(".button");
    const screenInput = document.getElementById("screen");
    const insertButton = document.getElementById("insert");
    const refundButton = document.getElementById("refund");
    const totalInserted = { value: 0 };
    const productMinimum = Math.min(...Array.from(buttons).map(button => parseInt(button.value)));

    inputDisplay.addEventListener("input", inputDisplayInputListener());
    inputDisplay.addEventListener("keypress", inputDisplayKeypressListener(insertButton));
    insertButton.addEventListener("click", insertButtonListener(inputDisplay, messageBox, screenInput, totalInserted));
    refundButton.addEventListener("click", refundButtonListener(inputDisplay, messageBox, screenInput, totalInserted));
    buttons.forEach(button => button.addEventListener("click", productButtonListener(button, screenInput, messageBox, totalInserted, productMinimum)));
};
