const render = (function () {
    function update(state) {
        document.getElementById('count').textContent = state.count;
    }

    return {
        update
    };
})();