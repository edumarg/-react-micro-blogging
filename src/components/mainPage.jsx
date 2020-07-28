import React, { Component } from "react";
import NewTwitt from "./newTwitt";
import TwittsList from "./twittsList";
import axios from "axios";

let mockedTwitts = [];

class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      postedTwitts: mockedTwitts,
    };
  }

  async componentDidMount() {
    const data = await axios.get(
      "https://fullstack-web-course.ew.r.appspot.com/tweet"
    );
    const postedTwittsFromServer = await data.data.tweets;
    console.log("data", data.data.tweets);
    this.setState({ postedTwitts: postedTwittsFromServer });
  }

  handleNewTwitt(twitt) {
    let newpostedTwitts = [...this.state.postedTwitts];
    newpostedTwitts = [twitt, ...newpostedTwitts];
    mockedTwitts = [...newpostedTwitts];
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
