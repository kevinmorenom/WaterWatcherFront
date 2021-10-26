import "./App.css";
import { Switch, Route, Redirect } from "react-router-dom";
import React, { useContext } from "react";
import AuthContext from "./store/auth-context";
import Layout from "./components/Layout/Layout";
import Devices from "./pages/Devices/Devices";
import Alerts from "./pages/Alerts/Alerts";
import MainPage from "./pages/MainPage/MainPage";
import Auth from "./components/Auth/Auth";

function App() {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;
  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          {!isLoggedIn ? <Auth></Auth> : <Redirect to="/home" />}
        </Route>
        {isLoggedIn && (
          <>
            {" "}
            <Route path="/home" exact>
              <MainPage></MainPage>
            </Route>
            <Route path="/devices">
              <Devices></Devices>
            </Route>
            <Route path="/alerts">
              <Alerts></Alerts>
            </Route>
          </>
        )}

        <Route>{!isLoggedIn && <Redirect to="/" />}</Route>
      </Switch>
    </Layout>
  );
}

export default App;
