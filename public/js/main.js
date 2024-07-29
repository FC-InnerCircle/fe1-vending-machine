import { initItemListButton } from './render/initItemListButton.js';
import { initPriceInput } from './render/initPriceInput.js';
import { initPriceInsert } from './render/initPriceInsert.js';
import { initPriceRefund } from './render/initPriceRefund.js';
import state from './state.js'

document.addEventListener('DOMContentLoaded', function () {

    state.subscribe(render.priceUpdate);
    state.subscribe(render.priceInputBoxUpdate);
    state.subscribe(render.viewTextLog);


    render.priceUpdate(state.getState())
    render.priceInputBoxUpdate(state.getState(), state.setState)
    render.viewTextLog(state.getState())

    initItemListButton(state, state.setState);
    initPriceInput(state, state.setState);
    initPriceInsert(state, state.setState);
    initPriceRefund(state, state.setState);


    // document.getElementById('myButton').addEventListener('click', function () {
    //     state.setState({ count: state.getState().count + 1 });
    // });
});