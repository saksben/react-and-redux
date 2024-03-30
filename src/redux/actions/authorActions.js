import * as types from "./actionTypes"
import * as authorApi from "../../api/authorApi";

// when api successfully gets authors list, sets its type to successful
export function loadAuthorsSuccess(authors) {
    return { type: types.LOAD_AUTHORS_SUCCESS, authors }
}

// get request for authors api, calls loadAuthorsSuccess on success
// Redux thunk injects dispatch so we don't have to
export function loadAuthors() {
    return function (dispatch) {
        return authorApi.getAuthors().then(authors => {
            dispatch(loadAuthorsSuccess(authors));
        }).catch(error => {
            throw error;
        })
    }
}