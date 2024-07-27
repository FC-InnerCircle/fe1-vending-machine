import { getState } from './state.js';

export const showTemporaryMessage = (label, message) => {
  const { itemsContainer } = getState();

  const buttons = itemsContainer.querySelectorAll('.item');
  buttons.forEach(button => {
    if (button.textContent === label) {
      const originalText = button.innerText;
      button.innerText = message;
      setTimeout(() => {
        button.innerText = originalText;
      }, 1000);
    }
  });
};
