//The redux store helper calls createStore() to create the centralized redux state store for the entire react application.

import {createStore, applyMiddleware} from "redux";
import rootReducer from "../reducers";
import thunkMiddleware from "redux-thunk";
import {createLogger} from "redux-logger";

const loggerMiddleware = createLogger();

export const store = createStore(
  rootReducer,
  // Use custom middleware for async actions
  // thunkMiddleware lets us dispatch() functions
  // loggerMiddleware logs actions
  applyMiddleware(thunkMiddleware, loggerMiddleware)
);
