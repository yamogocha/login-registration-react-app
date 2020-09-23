//contains redux action creator for actions related to alert notification in the application

//for example if to display a successful alert message 'Registration successful'
//can call dispatch(alertActions.success('Registration successful'))

//wrapping the action methods in an alertActions object,can simplify importing them into other files

import {alertConstants} from "../constants";

const success = message => {
  return {type: alertConstants.SUCCESS, message};
};

const error = message => {
  return {type: alertConstants.ERROR, message};
};

const clear = () => {
  return {type: alertConstants.CLEAR};
};

export const alertActions = {
  success,
  error,
  clear
};
