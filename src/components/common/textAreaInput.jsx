import React, { Component } from "react";

class TExtAreaInput extends Component {
  state = {};

  render() {
    return (
      <div className="form-group">
        <label className="sr-only" htmlFor="TwittTextArea">
          New Post
        </label>
        <textarea
          autoFocus
          //   maxLength="140"
          className="form-control col-11 mx-auto my-2 user-text-area"
          placeholder="What's in your mind..."
          id="TwittTextArea"
          autoCapitalize="sentencess"
          onChange={(event) => this.handleOnchange(event)}
          onKeyUp={(event) => this.handleKeyUp(event)}
        ></textarea>
        {this.validate() && (
          <div className="alert alert-danger">{this.validate()}</div>
        )}
      </div>
    );
  }
}

export default TExtAreaInput;
