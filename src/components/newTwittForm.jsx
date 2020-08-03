import React, { Component } from "react";
import Spinner from "react-bootstrap/Spinner";
import TwittContext from "../context/twittContext";
import firebase from "firebase";
import "firebase/firestore";

class NewTwitt extends Component {
  static contextType = TwittContext;
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      userName: "",
      date: "",
      content: "",
    };
  }

  componentDidMount() {
    this.setState({ userName: this.context.currentUser });
  }

  async handleOnSubmit(event) {
    event.preventDefault();
    const db = firebase.firestore();
    const response = await db.collection("posts").add({
      userName: this.state.userName,
      date: this.state.date,
      content: this.state.content,
    });
    console.log("response firebase", response);
  }

  // handleOnSubmit(event) {
  //   event.preventDefault();
  //   this.context.onNewTwitt(this.state);
  //   event.target.reset();
  //   this.setState({ content: "" });
  // }

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
    else return null;
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
            {this.context.hideSpinner && (
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
