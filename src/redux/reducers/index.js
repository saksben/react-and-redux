import { combineReducers } from "redux";
import courses from "./courseReducer";
import authors from "./authorReducer";

// central combinator of all reducers
const rootReducer = combineReducers({
  courses,
  authors,
});

export default rootReducer;
