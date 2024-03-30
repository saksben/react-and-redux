import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function courseReducer(state = initialState.courses, action) {
  switch (action.type) {
    // returns a new courses object with all state data + the new course
    case types.CREATE_COURSE:
      return [...state, { ...action.course }];
    // returns the list of courses
    case types.LOAD_COURSES_SUCCESS:
      return action.courses;
    default:
      return state;
  }
}
