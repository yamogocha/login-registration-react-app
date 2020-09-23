//The app component is the root component for the react hooks application
//it contains the jsx, routes and global alert notification
//If the url path doesn't match any route there is a default redirect defined below the routes that redirects the user to the home page.

//The second parameter to the useEffect React hook is an array of dependencies that determines when the hook is run
//passing an empty array causes the hook to only be run once when the component first loads
//like the componentDidMount lifecyle method in a traditional React class component.

import "../scss/App.scss";
import React, {useState, useEffect} from "react";
import {history} from "../helpers";
import {alertActions} from "../actions";
import PrivateRoute from "../components/privateRoute";
import HomePage from "../components/homePage";
import LoginForm from "../components/loginForm";
import RegisterForm from "../components/registerForm";
import {useSelector, useDispatch} from "react-redux";
import {Router, Switch, Route, Redirect} from "react-router-dom";

const App = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const clearInput = () => {
    setUser({
      username: "",
      email: "",
      password: "",
      confirmPassword: ""
    });
  };

  const alert = useSelector(state => state.alert.message);
  const dispatch = useDispatch();

  useEffect(() => {
    history.listen((location, action) => {
      // clear alert on location change
      dispatch(alertActions.clear());
      clearInput();
    });
  }, [dispatch]);

  return (
    <div className="login">
      <div className="login__card">
        <Router history={history}>
          <Switch>
            <Route
              path="/register"
              render={props => (
                <RegisterForm user={user} setUser={setUser} alert={alert} />
              )}
            />
            <Route
              path="/login"
              render={props => (
                <LoginForm user={user} setUser={setUser} alert={alert} />
              )}
            />
            <PrivateRoute exact path="/" component={HomePage} />
            <Redirect from="*" to="/" />
          </Switch>
        </Router>
      </div>
    </div>
  );
};

export default App;
