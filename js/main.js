import {
  setStorage,
  createItems,
  setupFormHandlers,
} from "./vendingMachine.js";

document.addEventListener("DOMContentLoaded", function () {
  setStorage();
  createItems();
  setupFormHandlers();
});
