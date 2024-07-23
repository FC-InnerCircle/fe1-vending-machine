export const showTemporaryMessage = (label, message) => {
  const buttons = document.querySelectorAll('.item');
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
