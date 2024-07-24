let amount = 0

function insertMoney() {
    const insertedMoney = parseInt(input.value);
    if (isNaN(insertedMoney) || insertedMoney < 0) {
        return;
    }

    const inputAmountDisplay = document.getElementById('inputAmountDisplay');

    if(amount > 0) {
        amount += insertedMoney;
    } else {
        amount = insertedMoney;
    }
    
    inputAmountDisplay.value = formatAmount(amount);
}

function purchaseItem(price) {
    console.log(price);
}

function formatAmount(amount) {
    return amount.toLocaleString();
}
