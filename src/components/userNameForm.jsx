import React, { Component } from "react";
import UserContext from "../context/userContext";
class UserNameForm extends Component {
  static contextType = UserContext;
  constructor(props) {
    super(props);
    this.state = { userName: this.props.currentUser };
  }

  handleOnSubmit(event) {
    event.preventDefault();
    this.props.history.replace("/home");
  }

  handleOnchange(event) {
    let newUserName = event.target.value;
    this.context.onNewUserName(newUserName);
  }

  handleKeyUp(event) {
    if (event.key === "Escape") {
      event.value = this.props.currentUser;
      this.setState({ userName: this.props.currentUser });
    }
  }

  validate() {
    const newUserName = this.context.currentUser;
    if (newUserName.trim() === "") return `User Name cannot be empty..`;
    else return null;
  }

  render() {
    return (
      <React.Fragment>
        <div className="col-6 mx-auto">
          <h2>Profile</h2>
          <form onSubmit={(event) => this.handleOnSubmit(event)}>
            <div className="form-group">
              <label htmlFor="inputUserName">User Name</label>
              <input
                type="text"
                className="form-control user-form-input"
                id="inputUserName"
                onChange={(event) => this.handleOnchange(event)}
                // onKeyUp={(event) => this.handleKeyUp(event)}
                value={this.context.currentUser}
              />
            </div>
            <div className="d-flex align-content-center align-items-center">
              <button type="submit" className="btn btn-primary mr-3">
                Submit
              </button>
              {this.validate() && (
                <div className="alert alert-danger mt-3">{this.validate()}</div>
              )}
            </div>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default UserNameForm;
