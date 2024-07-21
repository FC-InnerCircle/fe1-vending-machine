document.addEventListener('DOMContentLoaded', function () {
    state.subscribe(render.update);
    render.update(state.getState());

    // document.getElementById('myButton').addEventListener('click', function () {
    //     state.setState({ count: state.getState().count + 1 });
    // });
});