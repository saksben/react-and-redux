import * as types from "./actionTypes";
import * as authorApi from "../../api/authorApi";
import { beginApiCall } from "./apiStatusActions";
import { apiCallError } from "./apiStatusActions";

// when api successfully gets authors list, sets its type to successful
export function loadAuthorsSuccess(authors) {
  return { type: types.LOAD_AUTHORS_SUCCESS, authors };
}

// get request for authors api, calls loadAuthorsSuccess on success
// Redux thunk injects dispatch so we don't have to
export function loadAuthors() {
  return function (dispatch) {
    dispatch(beginApiCall()); // Start api call handler for spinner
    return authorApi
      .getAuthors()
      .then((authors) => {
        dispatch(loadAuthorsSuccess(authors));
      })
      .catch((error) => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}
