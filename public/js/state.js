const state = (function () {
    let state = {
        count: 0
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