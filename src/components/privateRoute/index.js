//the private route component render a route component if the user is logged in
//otherwise it direct user to /login page with a return url they were trying to access

//the way it checks if the user is logged in by checking that there is a user object in localStorage

//it will only give access to client side component
//it will not have access to secure data in server api because a valid authentication token JWT is required

import React from "react";
import {Route, Redirect} from "react-router-dom";

const PrivateRoute = ({component: Component, ...rest}) => {
  return (
    <Route
      {...rest}
      render={props => {
        if (!localStorage.getItem("user")) {
          return (
            //not logged in so return to /login page with the return url
            <Redirect
              to={{pathname: "/login", state: {from: props.location}}}
            />
          );
        }
        //logged in so return component
        return <Component {...props} />;
      }}
    />
  );
};

export default PrivateRoute;
