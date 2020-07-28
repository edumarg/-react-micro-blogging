import React, { Component } from "react";
import NewTwitt from "./newTwittForm";
import TwittsList from "./twittsList";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import config from "../config.json";

class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      postedTwitts: [],
      hideSpinner: false,
    };
  }

  async componentDidMount() {
    const data = await axios.get(`${config.URL}`);
    const postedTwittsFromServer = await data.data.tweets;
    this.setState({ postedTwitts: postedTwittsFromServer });
  }

  async handleNewTwitt(twitt) {
    let NewHideSpinner = this.state.hideSpinner;
    NewHideSpinner = true;
    this.setState({ hideSpinner: NewHideSpinner });
    try {
      let newPostedTwitts = [...this.state.postedTwitts];
      const response = await axios.post(`${config.URL}`, twitt);

      newPostedTwitts = [response.data, ...newPostedTwitts];
      NewHideSpinner = false;
      this.setState({ hideSpinner: NewHideSpinner });
    } catch (exeption) {
      NewHideSpinner = false;
      if (exeption.response && exeption.response.status === 404) {
        return toast.error("Information not found!!");
      } else toast.error("Unexpected error, please try again!");
    }
  }

  render() {
    const { postedTwitts } = this.state;
    return (
      <React.Fragment>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHove
        />
        <NewTwitt
          className="mx-5"
          onNewTwitt={(twitt) => this.handleNewTwitt(twitt)}
          hideSpinner={this.state.hideSpinner}
        ></NewTwitt>

        <TwittsList list={postedTwitts}></TwittsList>
      </React.Fragment>
    );
  }
}

export default MainPage;
