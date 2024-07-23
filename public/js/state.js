const state = (function () {
    let state = {
        price: 500,
        minPrice: 300,
        textLog: [],
        items: [
            { id: 1, text: 'FE300', price: 300 },
            { id: 2, text: 'FE400', price: 400 },
            { id: 3, text: 'FE500', price: 500 },
            { id: 4, text: 'FE600', price: 600 },
            { id: 5, text: 'FE700', price: 700 },
            { id: 6, text: 'FE800', price: 800 },
            { id: 7, text: 'FE900', price: 900 },
            { id: 8, text: 'FE1000', price: 1000 },
            { id: 9, text: 'FE1100', price: 1100 }
        ]

    };

    const listeners = [];

    function subscribe(listener) {
        listeners.push(listener);
    }

    function setState(newState) {

        state = { ...state, ...newState };

        listeners.forEach(listener => listener(state, setState));

    }

    function getState() {
        return state;
    }

    return {
        subscribe,
        setState,
        getState
    };
})();