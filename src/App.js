import React from "react";
import MainPage from "./components/mainPage";
import NavBarFrom from "./components/navBar";
import "bootstrap/dist/css/bootstrap.css";
import "react-toastify/dist/ReactToastify.css";
import "./myStile.css";

function App() {
  return (
    <React.Fragment>
      <NavBarFrom />
      <MainPage />
    </React.Fragment>
  );
}

export default App;
