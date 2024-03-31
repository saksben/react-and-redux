import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./reducers";
import reduxImmutableStateInvariant from "redux-immutable-state-invariant"
import thunk from "redux-thunk";

// sets up Redux store
export default function configureStore(initialState) {
    // add support for Redux dev tools
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    
    // takes all reducers and initial states, and applies thunk middleware to a function that ensures state is immutable
    return createStore(
        rootReducer, 
        initialState, 
        // applies thunk to redux (returns functions instead of objects, for async use)
        composeEnhancers(applyMiddleware(thunk, reduxImmutableStateInvariant()))
    );
}

// Redux process:
// 1. Action: An action is dispatched from the application. Actions are plain JavaScript objects that describe the change that needs to occur. They typically have a type property to indicate the type of action and optionally carry some payload data.
// 2. Reducer: Reducers are pure functions that specify how the application's state changes in response to actions. Each reducer takes the current state and an action as arguments, and returns the new state based on the action.
// 3. Store: The store is an object that brings actions and reducers together. It holds the application state and allows access to it via getState(). The store is also responsible for dispatching actions, which triggers the state change process.
// 4. Dispatch: When an action is dispatched, the store forwards it to the reducers. The reducers then process the action and return the new state. This triggers any subscribed UI components to re-render with the updated state.
// 5. UI Updates: UI components can connect to the Redux store to access state and subscribe to updates. When the state changes, connected components re-render with the new data.