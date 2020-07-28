import React, { Component } from "react";
class UserNameForm extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <form>
          <div class="form-group">
            <label for="inputUserName">User Name</label>
            <input type="email" class="form-control" id="inputUserName" />
          </div>
          <button type="submit" class="btn btn-primary">
            Submit
          </button>
        </form>
      </React.Fragment>
    );
  }
}

export default UserNameForm;
