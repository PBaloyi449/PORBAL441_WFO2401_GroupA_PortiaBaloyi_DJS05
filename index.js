const { store } = require('./store');

// Scenario 1: Initial State Verification
console.log("Scenario 1: Initial State Verification");
console.log(store.getState()); // { count: 0 }

// Scenario 2: Incrementing the Counter
console.log("Scenario 2: Incrementing the Counter");
store.dispatch({ type: 'ADD' });
store.dispatch({ type: 'ADD' });

// Scenario 3: Decrementing the Counter
console.log("Scenario 3: Decrementing the Counter");
store.dispatch({ type: 'SUBTRACT' });

// Scenario 4: Resetting the Counter
console.log("Scenario 4: Resetting the Counter");
store.dispatch({ type: 'RESET' });
