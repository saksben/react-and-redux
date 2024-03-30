import * as types from "./actionTypes"
import * as courseApi from "../../api/courseApi";

// creates a course
export function createCourse(course) {
    return { type: types.CREATE_COURSE, course };
}

// when api successfully gets authors list, sets its type to successful
export function loadCourseSuccess(courses) {
    return { type: types.LOAD_COURSES_SUCCESS, courses }
}

// get request for courses api, calls loadCoursesSuccess on success
// Redux thunk injects dispatch so we don't have to
export function loadCourses() {
    return function (dispatch) {
        return courseApi.getCourses().then(courses => {
            dispatch(loadCourseSuccess(courses));
        }).catch(error => {
            throw error;
        })
    }
}