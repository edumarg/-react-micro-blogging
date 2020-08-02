import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import MainPage from "./components/mainPage";
import NavBarFrom from "./components/navBar";
import UserNameForm from "./components/userNameForm";
import NotFound from "./components/notFound";
import "bootstrap/dist/css/bootstrap.css";
import "react-toastify/dist/ReactToastify.css";
import "./myStile.css";
import UserContext from "./context/userContext";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { currentUser: "" };
  }

  componentDidMount() {
    let newCurrentUser = localStorage.getItem("CurrentUserName");
    this.setState({ currentUser: newCurrentUser || "Default" });
  }

  handleNewUserName(userName) {
    console.log("handle new user", userName);
    this.setState({ currentUser: userName });
    localStorage.setItem("CurrentUserName", userName);
  }

  render() {
    return (
      <React.Fragment>
        <UserContext.Provider
          value={{
            currentUser: this.state.currentUser,
            onNewUserName: (userName) => this.handleNewUserName(userName),
          }}
        >
          <NavBarFrom />
          <div>
            <Switch>
              <Route
                path="/home"
                render={(props) => (
                  <MainPage currentUser={this.state.currentUser} {...props} />
                )}
              ></Route>
              <Route
                path="/user"
                render={(props) => (
                  <UserNameForm
                    currentUser={this.state.currentUser}
                    onNewUserName={(userName) =>
                      this.handleNewUserName(userName)
                    }
                    {...props}
                  />
                )}
              ></Route>
              <Route path="/not-found" component={NotFound}></Route>
              <Redirect from="/" exact to="/home"></Redirect>
            </Switch>
          </div>
        </UserContext.Provider>
      </React.Fragment>
    );
  }
}

export default App;
