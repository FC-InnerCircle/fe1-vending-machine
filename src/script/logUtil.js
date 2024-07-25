export const formatCurrency = value => Number(value).toLocaleString();

export const updateScreen = (screenInput, totalInserted) => {
    screenInput.value = formatCurrency(totalInserted);
};

export const updateMessageBox = (messageBox, text, amount) => {
    const newMessage = amount ? `${formatCurrency(amount)}원을 ${text}` : `${text}`;
    messageBox.value += messageBox.value ? `\n${newMessage}` : newMessage;
};
