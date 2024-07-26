const CHEAPEST_PRICE = 300;
let amount = 0;

const insertMoney = () => {
    const insertedMoney = parseInt(input.value);

    if (isNaN(insertedMoney) || insertedMoney < 0) {
        return;
    }

    amount += insertedMoney;
    inputAmountDisplay.value = formatAmount(amount);
    logVendingMachine(insertedMoney, "inserted");
};

const returnMoney = () => {
    if (amount > 0) {
        amount = 0;
        logVendingMachine(inputAmountDisplay.value, "returned");
        inputAmountDisplay.value = formatAmount(amount);
    }
};

const purchaseItem = (price) => {
    if (amount >= price) {
        amount -= price;
        inputAmountDisplay.value = formatAmount(amount);
        logVendingMachine(price, "purchased");

        if (amount < CHEAPEST_PRICE) {
            returnMoney();
        }
    }
};

const formatAmount = (amount) => {
    return amount.toLocaleString();
};

const logVendingMachine = (item, action) => {
    if (action === "returned") {
        output.value += formatAmount(item) + '원을 반환합니다. ' + '\n';
    } else if (action === "purchased") {
        output.value += item + '을 구매했습니다. ' + '\n';
    } else if (action === "inserted") {
        output.value += formatAmount(item) + '원을 투입했습니다. ' + '\n';
    }
};
