// item.test.js
import { initializeItems } from '../modules/items.js';
import { initializeState } from '../modules/state.js';
import { getBalance, setBalance } from '../modules/balance.js';

document.body.innerHTML = `
  <div id="items-container"></div>
`;

initializeState();

test('initializeItems should create item buttons', () => {
  initializeItems();
  const itemsContainer = document.getElementById('items-container');
  expect(itemsContainer.children.length).toBeGreaterThan(0);
});

test('item button click should trigger purchase', () => {
  setBalance(1000); // Sufficient balance for testing
  
  initializeItems();
  const itemsContainer = document.getElementById('items-container');
  const firstButton = itemsContainer.querySelector('button.item');
  
  firstButton.click();
  
  expect(getBalance()).toBeLessThan(1000);
});
