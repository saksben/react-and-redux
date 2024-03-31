import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers";
import thunk from "redux-thunk";

// sets up Redux store
export default function configureStore(initialState) {
  // takes all reducers and initial states, and applies thunk middleware to a function that ensures state is immutable
  return createStore(
    rootReducer,
    initialState,
    // applies thunk to redux (returns functions instead of objects, for async use)
    applyMiddleware(thunk)
  );
}
