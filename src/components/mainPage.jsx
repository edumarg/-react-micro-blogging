import React, { Component } from "react";
import NewTwitt from "./newTwitt";
import TwittsList from "./twittsList";

const MainPage = () => {
  return (
    <React.Fragment>
      <h1> Twitts </h1>
      <NewTwitt></NewTwitt>
      <TwittsList></TwittsList>
    </React.Fragment>
  );
};

export default MainPage;
