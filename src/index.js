function $(selector, element = document) {
  return element.querySelector(selector);
}

function init() {
  document.addEventListener('DOMContentLoaded', () => {
    const $buttonContainer = $('.vending-machine-buttons');

    createButtons($buttonContainer);
  });
}

function createButtons(target) {
  let htmlString = '';

  for (let i = 300; i <= 1100; i += 100) {
    htmlString += `
    <button class="p-2 bg-sky-200 flex-1" type="button">FE${i}</button>
    `;
  }

  target.innerHTML = htmlString;
}

init();
