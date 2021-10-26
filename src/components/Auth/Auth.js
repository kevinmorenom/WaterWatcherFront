import React, { useState, useRef, useContext } from "react";
import classes from "./Auth.module.css";
import AuthContext from "../../store/auth-context";
import { useHistory } from "react-router";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const telephoneRef = useRef();

  const history = useHistory();

  const authCtx = useContext(AuthContext);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (isLogin) {
      LoginHandler();
    } else {
      RegisterHandler();
    }
  };

  const clearInputs = () => {
    nameRef.current.value = "";
    passwordRef.current.value = "";
    telephoneRef.current.value = "";
  };
  const LoginHandler = () => {
    let credentials = {
      password: passwordRef.current.value,
      email: emailRef.current.value,
    };
    fetch("https://waterwatcher-back.herokuapp.com/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    })
      .then((response) => response.json())
      .then((data) => {
        authCtx.login(data.token);
        history.replace("/home");
      });
  };

  const RegisterHandler = () => {
    let credentials = {
      name: nameRef.current.value,
      password: passwordRef.current.value,
      email: emailRef.current.value,
      telephone: telephoneRef.current.value,
    };
    fetch("https://waterwatcher-back.herokuapp.com/api/users/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    })
      .then((response) => response.json())
      .then((data) => {
        clearInputs();
        switchAuthModeHandler();
      });
  };
  return (
    <div className={classes.main}>
      <img
        className={classes.logo}
        src="http://www.crazyleafdesign.com/blog/wp-content/uploads/2016/10/eyecon_1x.png"
        alt="Paris"
      />
      <section className={classes.auth}>
        <h1>{isLogin ? "Login" : "Sign Up"}</h1>
        <form onSubmit={submitHandler}>
          {!isLogin && (
            <div className={classes.control}>
              <label htmlFor="name">Your Name</label>
              <input ref={nameRef} type="text" id="name" required />
            </div>
          )}
          <div className={classes.control}>
            <label htmlFor="email">Email</label>
            <input ref={emailRef} type="email" id="email" required />
          </div>
          <div className={classes.control}>
            <label htmlFor="password">Password</label>
            <input ref={passwordRef} type="password" id="password" required />
          </div>
          {!isLogin && (
            <div className={classes.control}>
              <label htmlFor="telephone">Telephone</label>
              <input
                ref={telephoneRef}
                type="telephone"
                id="telephone"
                required
              />
            </div>
          )}
          <div className={classes.actions}>
            <button>{isLogin ? "Login" : "Create Account"}</button>
            <button
              type="button"
              className={classes.toggle}
              onClick={switchAuthModeHandler}
            >
              {isLogin ? "Create new account" : "Login with existing account"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
