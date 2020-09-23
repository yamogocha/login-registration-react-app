//redux registration reducer handle registration section of the application state
//on registration request it sets a registering flag to true and shows the loading spinner
//it clear the state on register success or failure

import {userConstants} from "../constants/userConstants";

export const registration = (state = {}, action) => {
  switch (action.type) {
    case userConstants.REGISTER_REQUEST:
      return {registering: true};
    case userConstants.REGISTER_SUCCESS:
      return {};
    case userConstants.REGISTER_FAILURE:
      return {};
    default:
      return state;
  }
};
