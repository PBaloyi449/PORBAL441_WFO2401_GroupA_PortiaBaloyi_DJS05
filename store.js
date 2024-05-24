// Store implementation using Observer pattern
function createStore(reducer) {
  let state;
  let listeners = [];

  const getState = () => state;

  const dispatch = (action) => {
      state = reducer(state, action);
      listeners.forEach(listener => listener());
  };

  const subscribe = (listener) => {
      listeners.push(listener);
      return () => {
          listeners = listeners.filter(l => l !== listener);
      };
  };

  // Initialize state
  dispatch({});

  return { getState, dispatch, subscribe };
}

// Reducer function to handle state changes
function tallyReducer(state = { count: 0 }, action) {
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

// Initialize the store with the tallyReducer
const store = createStore(tallyReducer);

// Exporting store for testing and use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { store };
} else {
  // Expose store globally for app.js
  window.store = store;
}

// Helper function to log the state with a label
const logState = (label, store) => {
  console.log(`${label}:`, store.getState());
};

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
