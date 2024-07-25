export const addLog = (message) => {
  const logDisplay = document.getElementById('log');
  const logEntry = document.createElement('li');
  logEntry.textContent = message;
  logDisplay.appendChild(logEntry);
  scrollLogToBottom();
};

export const scrollLogToBottom = () => {
  const logContainer = document.getElementById('log-container');
  logContainer.scrollTop = logContainer.scrollHeight;
};
