import React, { useState } from "react";

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
  currentUser: {},
  userDevices: {},
  refreshDevices: (devices)=>{}
});

export const AuthContextProvider = (props) => {
  const initialToken = localStorage.getItem("token");
  const [token, setToken] = useState(initialToken);
  const userIsLoggedIn = !!token;
  const [user, setUser] = useState(null);
  const [devices, setDevices] = useState([]);

  async function getUser() {
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
      throw new Error(data.message || "Could not post device");
    }
    setUser(data.user);
  }

  async function getUserDevices() {
    const response = await fetch(
      `https://waterwatcher-back.herokuapp.com/api/boards`,
      {
        method: "GET",
        headers: {
          authorization: localStorage.getItem("token"),
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Could not get user devices");
    }
    setDevices(data.data);
  }

  const loginHandler = (token) => {
    setToken(token);
    localStorage.setItem("token", token);

    setTimeout(() => {
      getUser();
      getUserDevices();
    }, 1000);
  };

  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  const refreshDevices =(devices)=>{
      setDevices(devices);
      
  }

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
    currentUser: user,
    userDevices:devices,
    refreshDevices:refreshDevices

  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
