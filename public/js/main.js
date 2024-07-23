document.addEventListener('DOMContentLoaded', function () {
    state.subscribe(render.update);
    state.subscribe(render.priceUpdate);
    state.subscribe(render.priceInputBoxUpdate);
    state.subscribe(render.prisceInsert);
    state.subscribe(render.prisceRefund);




    render.update(state.getState(), state.setState);
    render.priceUpdate(state.getState())
    render.priceInputBoxUpdate(state.getState(), state.setState)
    render.prisceInsert(state.getState(), state.setState)
    render.prisceRefund(state.getState(), state.setState)
    // document.getElementById('myButton').addEventListener('click', function () {
    //     state.setState({ count: state.getState().count + 1 });
    // });
});