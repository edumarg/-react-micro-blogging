import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class NavBarForm extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-3">
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <NavLink className="nav-item nav-link" to="/home">
                Home
              </NavLink>

              <NavLink className="nav-item nav-link" to="/user">
                Profile
              </NavLink>
            </div>
          </div>
        </nav>
      </React.Fragment>
    );
  }
}

export default NavBarForm;
