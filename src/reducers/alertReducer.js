//redux alert reducer manages application state for alert notification
//it updates state when an alert action is dispatched from anywhere in the application
//when alertConstants.SUCCESS is dispatched
//the reducer updates the alert state to an object with a type and a message

import {alertConstants} from "../constants";

export const alert = (state = {}, action) => {
  switch (action.type) {
    case alertConstants.SUCCESS:
      return {
        type: "alert-success",
        message: action.message
      };
    case alertConstants.ERROR:
      return {
        type: "alert-error",
        message: action.message
      };
    case alertConstants.CLEAR:
      return {};
    default:
      return state;
  }
};
