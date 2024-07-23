document.addEventListener('DOMContentLoaded', function () {
    state.subscribe(render.update);
    state.subscribe(render.priceUpdate);

    render.update(state.getState(), state.setState);
    render.priceUpdate(state.getState())

    // document.getElementById('myButton').addEventListener('click', function () {
    //     state.setState({ count: state.getState().count + 1 });
    // });
});