//contains redux action creators for actions related to users

//action creators are exported via userActions object

//most of the actions are async actions that are made up of multiple sub actions
//because they have to make an http request and wait for the response before completing
//async actions

//typically dispatch a requst action before performing an async task(http request)
//and then dispatch success and error actions based on the result of the async task

import {userConstants} from "../constants";
import {userService} from "../services";
import {alertActions} from "./alertActions";
import {history} from "../helpers";

const register = user => {
  return dispatch => {
    dispatch(request(user));

    userService.register(user).then(
      user => {
        dispatch(success(user));
        history.push("/login");
        dispatch(alertActions.success("Registration successful"));
      },
      error => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request(user) {
    return {type: userConstants.REGISTER_REQUEST, user};
  }
  function success(user) {
    return {type: userConstants.REGISTER_SUCCESS, user};
  }
  function failure(error) {
    return {type: userConstants.REGISTER_FAILURE, error};
  }
};

//login() action creator performs 3 steps
//1. dipatches LOGIN_REQUEST action with dispatch(request(username))
//2. calls the async task userService.login(username, password)
//3. dispatchese LOGIN_SUCCESS action with dispatch(success(user)) if login was successful
//or dispatches LOGIN_FAILURE action with dispatch(failure(error)) if login failed
const login = (username, email, password, from) => {
  return dispatch => {
    dispatch(request(username));

    userService.login(username, email, password).then(
      user => {
        dispatch(success(user));
        history.push(from);
      },
      error => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request(user) {
    return {type: userConstants.LOGIN_REQUEST, user};
  }
  function success(user) {
    return {type: userConstants.LOGIN_SUCCESS, user};
  }
  function failure(error) {
    return {type: userConstants.LOGIN_FAILURE, error};
  }
};

const logout = () => {
  userService.logout();
  return {type: userConstants.LOGOUT_REQUEST};
};

const getAll = () => {
  return dispatch => {
    dispatch(request());

    userService.getAll().then(
      users => dispatch(success(users)),
      error => dispatch(failure(error.toString()))
    );
  };

  function request() {
    return {type: userConstants.GETALL_REQUEST};
  }
  function success(users) {
    return {type: userConstants.GETALL_SUCCESS, users};
  }
  function failure(error) {
    return {type: userConstants.GETALL_FAILURE, error};
  }
};

const _delete = id => {
  return dispatch => {
    dispatch(request(id));

    userService.delete(id).then(
      user => dispatch(success(id)),
      error => dispatch(failure(id, error.toString()))
    );
  };

  function request(id) {
    return {type: userConstants.DELETE_REQUEST, id};
  }
  function success(id) {
    return {type: userConstants.DELETE_SUCCESS, id};
  }
  function failure(id, error) {
    return {type: userConstants.DELETE_FAILURE, id, error};
  }
};

export const userActions = {
  register,
  login,
  logout,
  getAll,
  delete: _delete
};
