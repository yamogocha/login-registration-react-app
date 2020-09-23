//userConstants object contain redux user action types that can be dispatched in application

//async actions that perform http requests involve a request followed by a success and error response
//each of these three steps is represented by redux action

export const userConstants = {
  REGISTER_REQUEST: "USERS_REGISTER_REQUEST",
  REGISTER_SUCCESS: "USERS_REGISTER_SUCCESS",
  REGISTER_FAILURE: "USERS_REGISTER_FAILURE",

  LOGIN_REQUEST: "USERS_LOGIN_REQUEST",
  LOGIN_SUCCESS: "USERS_LOGIN_SUCCESS",
  LOGIN_FAILURE: "USERS_LOGIN_FAILURE",

  LOGOUT_REQUEST: "USERS_LOGOUT",

  GETALL_REQUEST: "USERS_GETALL_REQUEST",
  GETALL_SUCCESS: "USERS_GETALL_SUCCESS",
  GETALL_FAILURE: "USERS_GETALL_FAILURE",

  DELETE_REQUEST: "USERS_DELETE_REQUEST",
  DELETE_SUCCESS: "USERS_DELETE_SUCCESS",
  DELETE_FAILURE: "USERS_DELETE_FAILURE"
};
