import React, { useState } from "react";

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
  currentUser: {}
});

export const AuthContextProvider = (props) => {
  const initialToken = localStorage.getItem("token");
  const [token, setToken] = useState(initialToken);
  const userIsLoggedIn = !!token;
  const user = localStorage.getItem("user");
  console.log(user);

  async function getUser() {
    try {
      const response = await fetch(
        `https://waterwatcher-back.herokuapp.com/api/users/user`,
        {
          method: "GET",
          headers: {
            authorization: localStorage.getItem("token"),
          },
        }
      );

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Could not get user");
      }
      // setUser(data.user);
      localStorage.setItem("user", data.user);
      return data.user;
    } catch {
      return null;
    }
  }

  

  const loginHandler = (token) => {
    setToken(token);
    localStorage.setItem("token", token);

    setTimeout(() => {
      getUser();
    }, 1000);
  };

  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
    currentUser: user
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
