//redux authentication reducer manage state related to login and logout actions
//on successful login the current user object and a loggedin flag are stored in the authentication section of the application state
//on logout or login failure the authentication state is set to an empty object
//between login request and success/failure the authentication state has a logginIn flag set to true
//and an object with the details of the user is attempting to login

import {userConstants} from "../constants/userConstants";

let user = JSON.parse(localStorage.getItem("user"));
const initialState = user ? {loggedIn: true, user} : {};

export const authentication = (state = initialState, action) => {
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      return {
        loggingIn: true,
        user: action.user
      };
    case userConstants.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        user: action.user
      };
    case userConstants.LOGIN_FAILURE:
      return {};
    case userConstants.LOGOUT:
      return {};
    default:
      return state;
  }
};
