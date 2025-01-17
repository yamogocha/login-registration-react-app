//The backend is used for running the app without a server api (backend-less).
//It monkey patches the fetch() function to intercept certain api requests
//mimic the behaviour of a real api by managing data in browser local storage.
//Any requests that aren't intercepted get passed through to the real fetch() function.

// array in local storage for registered users
let users = JSON.parse(localStorage.getItem("users")) || [];

export function configureBackend() {
  let realFetch = window.fetch;
  window.fetch = function(url, opts) {
    const {method, headers} = opts;
    const body = opts.body && JSON.parse(opts.body);

    return new Promise((resolve, reject) => {
      // wrap in timeout to simulate server api call
      setTimeout(handleRoute, 500);

      function handleRoute() {
        switch (true) {
          case url.endsWith("/users/authenticate") && method === "POST":
            return authenticate();
          case url.endsWith("/users/register") && method === "POST":
            return register();
          case url.endsWith("/users") && method === "GET":
            return getUsers();
          case url.match(/\/users\/\d+$/) && method === "DELETE":
            return deleteUser();
          default:
            // pass through any requests not handled above
            return realFetch(url, opts)
              .then(response => resolve(response))
              .catch(error => reject(error));
        }
      }

      // route functions

      function authenticate() {
        const {username, email, password} = body;
        const user = users.find(
          x =>
            x.username === username &&
            x.email === email &&
            x.password === password
        );
        if (!user) return error("Username or email or password is incorrect");
        ok({
          id: user.id,
          username: user.username,
          email: user.email,
          password: user.password,
          token: "fake-jwt-token"
        });
        return isLoggedIn();
      }

      function register() {
        const user = body;

        if (users.find(x => x.username === user.username)) {
          return error(`Username  ${user.username} is already taken`);
        }

        if (!user.username || !user.email || !user.password) {
          return error("Please enter valid name, email and password");
        }

        if (user.password !== user.confirmPassword) {
          return error("Passwords do not match");
        }

        // assign user id and a few other properties then save
        user.id = users.length ? Math.max(...users.map(x => x.id)) + 1 : 1;
        users.push(user);
        localStorage.setItem("users", JSON.stringify(users));

        return ok();
      }

      function getUsers() {
        // if (!isLoggedIn()) return unauthorized();

        return ok(users);
      }

      function deleteUser() {
        // if (!isLoggedIn()) return unauthorized();

        users = users.filter(x => x.id !== idFromUrl());
        localStorage.setItem("users", JSON.stringify(users));
        return ok();
      }

      // helper functions

      function ok(body) {
        resolve({ok: true, text: () => Promise.resolve(JSON.stringify(body))});
      }

      // function unauthorized() {
      //   resolve({
      //     status: 401,
      //     text: () => Promise.resolve(JSON.stringify({message: "Unauthorized"}))
      //   });
      // }

      function error(message) {
        resolve({
          status: 400,
          text: () => Promise.resolve(JSON.stringify({message}))
        });
      }

      function isLoggedIn() {
        return headers["Authorization"] === "Bearer fake-jwt-token";
      }

      function idFromUrl() {
        const urlParts = url.split("/");
        return parseInt(urlParts[urlParts.length - 1]);
      }
    });
  };
}
