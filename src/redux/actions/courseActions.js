import * as types from "./actionTypes";
import * as courseApi from "../../api/courseApi";

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

// get request for courses api, calls loadCoursesSuccess above on success
// Redux thunk injects dispatch so we don't have to
export function loadCourses() {
  return function (dispatch) {
    return courseApi
      .getCourses()
      .then((courses) => {
        dispatch(loadCourseSuccess(courses));
      })
      .catch((error) => {
        throw error;
      });
  };
}

export function saveCourse(course) {
  //eslint-disable-next-line no-unused-vars
  return function (dispatch, getState) {
    return courseApi
      .saveCourse(course)
      .then((savedCourse) => {
        // if course has an id, update course, else create course. Set the action type either way
        course.id
          ? dispatch(updateCourseSuccess(savedCourse))
          : dispatch(createCourseSuccess(savedCourse));
      })
      .catch((error) => {
        throw error;
      });
  };
}
