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
  
  // Subscribe to the store and log the state changes to the console
  store.subscribe(() => console.log(store.getState()));
  
  // Exporting store for testing purposes
  module.exports = { store };
  