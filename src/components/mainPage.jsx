import React, { Component } from "react";
import NewTwitt from "./newTwitt";
import TwittsList from "./twittsList";

const mockedTwitts = [];

class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      postedTwitts: mockedTwitts,
    };
  }

  handleNewTwitt(twitt) {
    let newpostedTwitts = [...this.state.postedTwitts];
    newpostedTwitts = [twitt, ...newpostedTwitts];
    this.setState({ postedTwitts: newpostedTwitts });
  }

  render() {
    const { postedTwitts } = this.state;
    return (
      <React.Fragment>
        <h1> Twitts </h1>
        <NewTwitt onNewTwitt={(twitt) => this.handleNewTwitt(twitt)}></NewTwitt>
        <TwittsList list={postedTwitts}></TwittsList>
      </React.Fragment>
    );
  }
}

export default MainPage;
