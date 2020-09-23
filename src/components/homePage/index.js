//The home page component is displayed after signing in to the application
//it shows the signed in user's name and a list of all registered users
//All users are loaded into redux state by calling dispatch(userActions.getAll())
//in the useEffect() which dispatches the redux action userActions.getAll().

//when the delete link is clicked it calls the handleDeleteUser(user.id) function which dispatches the redux action userActions.delete(id).

import React, {useEffect, Fragment} from "react";
import {useDispatch, useSelector} from "react-redux";
import {userActions} from "../../actions";
import {Button, Alert} from "reactstrap";
import {history} from "../../helpers";

const HomePage = () => {
  const users = useSelector(state => state.users);
  const user = useSelector(state => state.authentication.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userActions.getAll());
  }, [dispatch]);

  const handleDeleteUser = id => {
    dispatch(userActions.delete(id));
  };

  return (
    <div className="login__content">
      <h2 className="login__title">{`Hi ${user.username}!`}</h2>
      <h2 className="login__title">You're logged in with Mine!</h2>
      <h3>All registered users:</h3>
      {users.loading && (
        <Fragment>
          <span className="spinner-border spinner-border-sm mr-1"></span>
          <em>Loading users...</em>
        </Fragment>
      )}
      {users.error && <Alert className="login__error">{users.error}</Alert>}
      {users.items && (
        <ul>
          {users.items.map((user, index) => (
            <li key={user.id}>
              {user.username}
              {user.deleting ? (
                <Fragment>
                  <span className="spinner-border spinner-border-sm mr-1"></span>
                  <em>Deleting user...</em>
                </Fragment>
              ) : user.deleteError ? (
                <Alert className="login__error">{user.deleteError}</Alert>
              ) : (
                <Button
                  onClick={() => handleDeleteUser(user.id)}
                  className="login__signup-btn"
                >
                  DELETE
                </Button>
              )}
            </li>
          ))}
        </ul>
      )}
      <Button
        block
        className="login__switch-btn"
        onClick={() => history.push("/login")}
      >
        LOGOUT
      </Button>
    </div>
  );
};

export default HomePage;
