import React, { Component } from "react";
import Spinner from "react-bootstrap/Spinner";

class NewTwitt extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      userName: this.props.currentUser,
      date: "",
      content: "",
    };
  }

  handleOnSubmit(event) {
    event.preventDefault();
    this.props.onNewTwitt(this.state);
    event.target.reset();
    this.setState({ content: "" });
  }

  handleOnchange(event) {
    let newContent = event.target.value;
    const now = new Date();
    const date = now.toISOString();
    const id = Date.now() - new Date("1981-05-20");
    this.setState({ content: newContent, date, id });
  }

  handleKeyUp(event) {
    if (event.key === "Escape") {
      event.value = "";
      this.setState({ content: "" });
    }
  }

  validate() {
    const content = this.state.content;
    if (content.length > 140)
      return `You have use ${content.length} chacarters.
      You can't use more than 140 characters...`;
    else if (content.trim() === "") return `Post cannot be empty..`;
    else return null
  }

  render() {
    return (
      <React.Fragment>
        <form
          className="col-6 mx-auto my-3 user-form"

          onSubmit={(event) => this.handleOnSubmit(event)}
        >
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

          </div>
          <div className="d-flex justify-content-end align-content-center align-items-center">
            {this.validate() && (
              <div className="alert alert-danger mr-3">{this.validate()}</div>
            )}
            {this.props.hideSpinner && (
              <Spinner className="mr-3" animation="border" variant="primary" />
            )}
            <button
              type="submit"
              className="btn btn-primary mb-2"
              disabled={this.validate()}
            >
              Post
            </button>
          </div>
        </form>
      </React.Fragment>
    );
  }
}

export default NewTwitt;
