import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import MainPage from "./components/mainPage";
import NavBarFrom from "./components/navBar";
import UserNameForm from "./components/userNameForm";
import NotFound from "./components/notFound";
import "bootstrap/dist/css/bootstrap.css";
import "react-toastify/dist/ReactToastify.css";
import "./myStile.css";

function App() {
  return (
    <React.Fragment>
      <NavBarFrom />
      <div>
        <Switch>
          <Route path="/home" component={MainPage}></Route>
          <Route path="/user" component={UserNameForm}></Route>
          <Route path="/not-found" component={NotFound}></Route>
          <Redirect from="/" exact to="/home"></Redirect>
        </Switch>
      </div>
    </React.Fragment>
  );
}

export default App;
