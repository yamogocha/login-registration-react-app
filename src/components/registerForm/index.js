//The register form component renders a simple registration form with fields for username, email, password and confirmpassword.
//It displays validation messages when the user attempts to submit the form.
//If the form is valid, submitting it calls dispatch(userActions.register(user)) which dispatches the redux action
//The user login status is reset to 'logged out' when the component loads by calling dispatch(userActions.logout()) in useEffect().

import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {Button, Form, Input, Alert} from "reactstrap";
import {userActions, alertActions} from "../../actions";
import {history} from "../../helpers";
import SocialButtons from "../socialButtons";

const RegisterForm = ({user, setUser, alert}) => {
  const registering = useSelector(state => state.registration.registering);
  const dispatch = useDispatch();

  const handleChange = e => {
    const {id, value} = e.target;
    setUser(user => ({...user, [id]: value}));
    dispatch(alertActions.clear());
  };

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(userActions.register(user));
  };

  return (
    <Form className="login__content">
      <h2 className="login__title">{"Join the Adventure!"}</h2>
      <Alert className="login__error">{alert}</Alert>
      <Input
        type="name"
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
      <Input
        type="password"
        id="confirmPassword"
        placeholder="Confirm Password"
        value={user.confirmPassword}
        onChange={handleChange}
      />
      <Button className="login__signup-btn" onClick={handleSubmit}>
        {registering && (
          <span className="spinner-border spinner-border-sm mr-1"></span>
        )}
        CREATE MY ACCOUNT
      </Button>
      <span>or login with</span>
      <SocialButtons />
      <Button
        onClick={() => history.push("/login")}
        block
        className="login__switch-btn"
      >
        I'VE ADVENTURED
      </Button>
    </Form>
  );
};

export default RegisterForm;
