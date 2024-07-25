import './style/main.css';
import { setupEventListeners, createButtons } from './script/vending-machine.js';

document.addEventListener("DOMContentLoaded", () => {
    createButtons();
    setupEventListeners();
});
