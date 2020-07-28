import React, { Component } from "react";
import Spinner from "react-bootstrap/Spinner";

class NewTwitt extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      userName: "Edu.M",
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
      event.input.value = "";
      this.setState({ content: "" });
    }
  }

  validate() {
    const content = this.state.content;
    return content.length > 140
      ? `You have use ${content.length} chacarters.
      You can't use more than 140 characters...`
      : null;
  }

  render() {
    return (
      <React.Fragment>
        <form
          className="col-10 mx-auto my-3 user-form"
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
            {this.validate() && (
              <div className="alert alert-danger">{this.validate()}</div>
            )}
          </div>
          <div className="d-flex justify-content-end">
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
