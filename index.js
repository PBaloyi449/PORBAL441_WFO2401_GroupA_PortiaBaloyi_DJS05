const { store } = require('./store');

// Initial state of the tally counter
const initialState = { count: 0 };

// Reducer function that handles actions and updates the state accordingly
function counterReducer(state = initialState, action) {
  switch (action.type) {
    case 'ADD':
      return { count: state.count + 1 };
    case 'SUBTRACT':
      return { count: state.count - 1 };
    case 'RESET':
      return { count: 0 };
    default:
      return state;
  }
}

// Function to create a Redux-like store
function createStore(reducer) {
  let state; // Holds the current state
  let listeners = []; // Array of listener functions

  // Returns the current state
  const getState = () => state;

  // Dispatches an action, updates the state, and notifies listeners
  const dispatch = (action) => {
    state = reducer(state, action);
    listeners.forEach(listener => listener());
  };

  // Adds a listener function that gets called whenever the state changes
  const subscribe = (listener) => {
    listeners.push(listener);
    // Returns an unsubscribe function to remove the listener
    return () => {
      listeners = listeners.filter(l => l !== listener);
    };
  };

  // Initialize the state by dispatching a dummy action
  dispatch({ type: '@@INIT' });

  return { getState, dispatch, subscribe };
}

// Helper function to log the state with a label
const logState = (label, store) => {
  console.log(`${label}:`, store.getState());
};

// Create a store with the counter reducer
//const store = createStore(counterReducer);

// Scenario 1: Initial State Verification
logState('Initial State', store); // Expected output: { count: 0 }

// Scenario 2: Incrementing the Counter
store.dispatch({ type: 'ADD' }); // Increment count by 1
store.dispatch({ type: 'ADD' }); // Increment count by 1 again
logState('After Incrementing', store); // Expected output: { count: 2 }

// Scenario 3: Decrementing the Counter
store.dispatch({ type: 'SUBTRACT' }); // Decrement count by 1
logState('After Decrementing', store); // Expected output: { count: 1 }

// Scenario 4: Resetting the Counter
store.dispatch({ type: 'RESET' }); // Reset count to 0
logState('After Resetting', store); // Expected output: { count: 0 }