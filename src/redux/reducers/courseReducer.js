import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function courseReducer(state = initialState.courses, action) {
  switch (action.type) {
    // returns a new courses object with all state data + the new course
    case types.CREATE_COURSE_SUCCESS:
      return [...state, { ...action.course }];
    case types.UPDATE_COURSE_SUCCESS:
      // for each course, if course id matches the one in the action, updates it to the action course, else returns the original course
      return state.map((course) =>
        course.id === action.course.id ? action.course : course
      );
    // returns the list of courses
    case types.LOAD_COURSES_SUCCESS:
      return action.courses;
      // deletes the course from the list
    case types.DELETE_COURSE_OPTIMISTIC:
      return state.filter((course) => course.id !== action.course.id);
    default:
      return state;
  }
}
