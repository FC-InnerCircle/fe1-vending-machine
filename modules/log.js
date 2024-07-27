import { getState } from './state.js';

export const addLog = (message) => {
  const { logDisplay } = getState();
  const logEntry = document.createElement('li');
  logEntry.textContent = message;
  if (logDisplay) {
    logDisplay.appendChild(logEntry);
  }
  scrollLogToBottom();
};

export const scrollLogToBottom = () => {
  const { logContainer } = getState();
  if (logContainer) {
    logContainer.scrollTop = logContainer.scrollHeight;
  }
};