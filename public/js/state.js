const state = (function () {
    let state = {
        count: 0,
        items: [
            { id: 1, text: 'FE300', price: 300 },
            { id: 2, text: 'FE600', price: 600 },
            { id: 3, text: 'FE1200', price: 1200 },
            { id: 4, text: 'FE1500', price: 1500 },
            { id: 5, text: 'FE1800', price: 1800 },
            { id: 6, text: 'FE2100', price: 2100 },
            { id: 7, text: 'FE2200', price: 2200 },
            { id: 8, text: 'FE2400', price: 2400 },
            { id: 9, text: 'FE2500', price: 2500 }
        ]

    };

    const listeners = [];

    function subscribe(listener) {
        listeners.push(listener);
    }

    function setState(newState) {
        state = { ...state, ...newState };
        listeners.forEach(listener => listener(state));
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