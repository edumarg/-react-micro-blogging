import React, { Component } from "react";
import PostedTwitt from "./postedTwitt";

class TwittsList extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <h3>Twitt list</h3>
        <PostedTwitt></PostedTwitt>
      </React.Fragment>
    );
  }
}

export default TwittsList;
