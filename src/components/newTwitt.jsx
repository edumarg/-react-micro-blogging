import React, { Component } from "react";

class NewTwitt extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      userName: "Edu.M",
      createdAt: "",
      text: "",
    };
  }

  handleOnSubmit(event) {
    event.preventDefault();
    this.props.onNewTwitt(this.state);
    event.target.reset();
    this.setState({ task: "" });
  }

  handleOnchange(event) {
    let newText = event.target.value;
    const now = Date.now();
    const createdAt = Date(now);
    const id = Date.now() - new Date("1981-05-20");
    this.setState({ text: newText, createdAt, id });
  }

  handleKeyUp(event) {
    if (event.key === "Escape") {
      console.log("ESC", event.key);
      event.input.value = "";
      this.setState({ task: "" });
    }
  }

  validate() {
    const text = this.state.text;
    return text.length > 140
      ? `You have use ${text.length} chacarters.
      You can't use more than 140 characters...`
      : // ? "You have  a maximum of 140 characters...."
        null;
  }

  render() {
    console.log(this.validate());
    return (
      <React.Fragment>
        <form
          className="col-10 m-auto"
          onSubmit={(event) => this.handleOnSubmit(event)}
          style={{
            border: "#cccccc solid 2px",
          }}
        >
          <div className="form-group">
            <label className="sr-only" htmlFor="TwittTextArea">
              New Twitt
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
