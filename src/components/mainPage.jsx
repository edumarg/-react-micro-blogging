import React, { Component } from "react";
import NewTwitt from "./newTwitt";
import TwittsList from "./twittsList";

let mockedTwitts = [];

class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      postedTwitts: mockedTwitts,
    };
  }

  componentDidMount() {
    let cachedPostedTwitts = localStorage.getItem("mockedTwittsInLocalStorage");
    cachedPostedTwitts = JSON.parse(cachedPostedTwitts);
    console.log(cachedPostedTwitts);
    this.setState({ postedTwitts: cachedPostedTwitts || [] });
  }

  handleNewTwitt(twitt) {
    let newpostedTwitts = [...this.state.postedTwitts];
    newpostedTwitts = [twitt, ...newpostedTwitts];
    mockedTwitts = [...newpostedTwitts];
    localStorage.setItem(
      "mockedTwittsInLocalStorage",
      JSON.stringify(newpostedTwitts)
    );
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
