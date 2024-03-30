import * as types from "../actions/actionTypes";
import initialState from "./initialState";

function actionTypeEndsInSuccess(type) {
  return type.substring(type.length - 8) === "_SUCCESS";
}

// If there is an api call made, increase the api progress state, else if an api call was successfully made or an error caught, decrease api progress state
export default function apiCallStatusReducer(
  state = initialState.apiCallsInProgress,
  action
) {
  if (action.type == types.BEGIN_API_CALL) {
    return state + 1;
  } else if (
    action.type === types.API_CALL_ERROR || // to reset state as minus 1 and get rid of progress spinner
    actionTypeEndsInSuccess(action.type)
  ) {
    return state - 1;
  }

  return state;
}
