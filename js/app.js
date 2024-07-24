let amount = 0;

function insertMoney() {
    const insertedMoney = parseInt(input.value);

    if (isNaN(insertedMoney) || insertedMoney < 0) {
        return;
    }

    if(amount > 0) {
        amount += insertedMoney;
    } else {
        amount = insertedMoney;
    }
    
    inputAmountDisplay.value = formatAmount(amount);
    logVendingMachine(insertedMoney, "inserted");
}

function returnMoney () {
    if(amount > 0) {
        amount = 0;

        logVendingMachine(inputAmountDisplay.value, "returned");
        inputAmountDisplay.value = formatAmount(amount);
    }
}

function purchaseItem(price) {
    if(amount >= price) {
        amount -= price;
        inputAmountDisplay.value = formatAmount(amount);
        logVendingMachine(price, "purchased");
    } else {
        returnMoney();
    }
}

function formatAmount(amount) {
    return amount.toLocaleString();
}

function logVendingMachine(item, action) {
    if(action === "returned") {
        output.value += formatAmount(item) + '원을 반환합니다. '  + '\n';
        return;
    } else if(action === "purchased") {
        output.value += item + '을 구매했습니다. '  + '\n';

        return;
    } else if(action === "inserted") { 
        output.value += formatAmount(item) + '원을 투입했습니다. '  + '\n';
        return;
    }
}   