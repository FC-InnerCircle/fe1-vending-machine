document.addEventListener('DOMContentLoaded', function () {
    state.subscribe(render.update);
    state.subscribe(render.priceUpdate);
    state.subscribe(render.priceInputBoxUpdate);

    render.update(state.getState(), state.setState);
    render.priceUpdate(state.getState())
    render.priceInputBoxUpdate(state.getState(), state.setState)
    // document.getElementById('myButton').addEventListener('click', function () {
    //     state.setState({ count: state.getState().count + 1 });
    // });
});