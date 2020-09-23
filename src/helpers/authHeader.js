//auth header is a helper function that returns a http authorization header
//containing Json web token (JWT) of the currently logged in user from local storage
//if the user isn't logged in, it returns an empty object
//the auth header is used to make http authendicated requests to the server api using JWT authentication

export const authHeader = () => {
  let user = JSON.parse(localStorage.getItem("user"));

  if (user && user.token) {
    return {Authentication: user.token};
  } else {
    return {};
  }
};
