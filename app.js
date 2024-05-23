// Assuming the store is in the global scope provided by store.js
const counterDisplay = document.getElementById('counter');
const addBtn = document.getElementById('addBtn');
const subtractBtn = document.getElementById('subtractBtn');
const resetBtn = document.getElementById('resetBtn');

// Update the counter display
const updateCounter = () => {
  counterDisplay.textContent = store.getState().count;
  console.log(store.getState());
};

// Initial display
updateCounter();

// Subscribe to store updates
store.subscribe(updateCounter);

// Button event listeners
addBtn.addEventListener('click', () => {
  store.dispatch({ type: 'ADD' });
});

subtractBtn.addEventListener('click', () => {
  store.dispatch({ type: 'SUBTRACT' });
});

resetBtn.addEventListener('click', () => {
  store.dispatch({ type: 'RESET' });
});
