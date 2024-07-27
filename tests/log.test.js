import { addLog, scrollLogToBottom } from '../modules/log.js';
import { initializeState } from '../modules/state.js';

document.body.innerHTML = `
  <div id="log-container" style="height: 100px; overflow-y: scroll;">
    <ul id="log-display">
    </ul>
  </div>
`;

initializeState();

test('addLog should add a new log entry', () => {
  addLog('Test log message');
  
  const logDisplay = document.getElementById('log-display');
  expect(logDisplay.children.length).toBe(1);
  expect(logDisplay.children[0].textContent).toBe('Test log message');
});

test('scrollLogToBottom should scroll to the bottom', () => {
  for (let i = 0; i < 20; i++) {
    addLog(`Log entry ${i}`);
  }

  const logContainer = document.getElementById('log-container');
  scrollLogToBottom();

  expect(logContainer.scrollTop).toBe(logContainer.scrollHeight - logContainer.clientHeight);
});
