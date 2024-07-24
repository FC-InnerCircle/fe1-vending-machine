let amount = 0

function insertMoney() {
    const value = parseInt(input.value);
    if (isNaN(value) || value < 0) {
        return;
    }

    const inputAmountDisplay = document.getElementById('inputAmountDisplay');

    if(amount > 0) {
        amount += value;
    } else {
        amount = value;
    }
    inputAmountDisplay.value = amount;
}

function purchaseItem(price) {
    console.log(price);
}