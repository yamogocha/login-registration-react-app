//The login form component renders a login form with username, email, password fields.
//It displays validation messages when the user attempts to submit the form.
//If infos are valid, submitting it calls redux action dispatch(userActions.login(username, password))

//The useEffect() calls redux action dispatch(userActions.logout()) to log the user out

import React, {useEffect} from "react";
import {Button, Form, Input, Alert} from "reactstrap";
import {useSelector, useDispatch} from "react-redux";
import {userActions, alertActions} from "../../actions";
import {useLocation} from "react-router-dom";
import SocialButtons from "../socialButtons";
import {history} from "../../helpers";

const LoginForm = ({user, setUser, alert}) => {
  const loggingIn = useSelector(state => state.authentication.loggingIn);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(userActions.logout());
  }, [dispatch]);

  const handleChange = e => {
    const {id, value} = e.target;
    setUser(user => ({...user, [id]: value}));
    dispatch(alertActions.clear());
  };

  const handleSubmit = e => {
    e.preventDefault();
    // get return url from location state or default to home page
    const {from} = location.state || {from: {pathname: "/"}};
    dispatch(userActions.login(user.username, user.email, user.password, from));
  };

  return (
    <Form className="login__content">
      <h2 className="login__title">{"Welcome Back!"}</h2>
      <Alert className="login__error">{alert}</Alert>
      <Input
        type="username"
        id="username"
        placeholder="Adventurer Name"
        value={user.username}
        onChange={handleChange}
      />
      <Input
        type="email"
        id="email"
        placeholder="Email"
        value={user.email}
        onChange={handleChange}
      />
      <Input
        type="password"
        id="password"
        placeholder="Password"
        value={user.password}
        onChange={handleChange}
      />
      <Button className="login__signup-btn" onClick={handleSubmit}>
        {loggingIn && (
          <span className="spinner-border spinner-border-sm mr-1"></span>
        )}
        SIGN IN
      </Button>
      <span>or login with</span>
      <SocialButtons />
      <Button
        block
        className="login__switch-btn"
        onClick={() => history.push("/register")}
      >
        JOIN THE ADVENTURED
      </Button>
    </Form>
  );
};

export default LoginForm;
