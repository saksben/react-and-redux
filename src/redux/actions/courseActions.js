import * as types from "./actionTypes";
import * as courseApi from "../../api/courseApi";
import { beginApiCall, apiCallError } from "./apiStatusActions";

// When api successfully gets authors list, sets the action type
// The "action" used in courseReducer is the returned object here, of type (first param) and with payload/data property (second param).
// The data property in this case is the data payload returned from the api call in loadCourses/saveCourse
export function loadCourseSuccess(courses) {
  return { type: types.LOAD_COURSES_SUCCESS, courses };
}

export function createCourseSuccess(course) {
  return { type: types.CREATE_COURSE_SUCCESS, course };
}

export function updateCourseSuccess(course) {
  return { type: types.UPDATE_COURSE_SUCCESS, course };
}

export function deleteCourseOptimistic(course) {
  return { type: types.DELETE_COURSE_OPTIMISTIC, course };
}

// get request for courses api, calls loadCoursesSuccess above on success
// Redux thunk injects dispatch so we don't have to
export function loadCourses() {
  return function (dispatch) {
    dispatch(beginApiCall()); // Start api call handler for spinner
    return courseApi
      .getCourses()
      .then((courses) => {
        dispatch(loadCourseSuccess(courses));
      })
      .catch((error) => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

export function saveCourse(course) {
  //eslint-disable-next-line no-unused-vars
  return function (dispatch, getState) {
    dispatch(beginApiCall()); // Start api call handler for spinner
    return courseApi
      .saveCourse(course)
      .then((savedCourse) => {
        // if course has an id, update course, else create course. Set the action type either way
        course.id
          ? dispatch(updateCourseSuccess(savedCourse))
          : dispatch(createCourseSuccess(savedCourse));
      })
      .catch((error) => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

export function deleteCourse(course) {
  return function (dispatch) {
    // An optimistic delete, so not dispatching begin/end api call actions or apiCallError action since we're not showing the loading status for this
    dispatch(deleteCourseOptimistic(course));
    return courseApi.deleteCourse(course.id);
  };
}
