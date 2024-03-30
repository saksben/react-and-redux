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