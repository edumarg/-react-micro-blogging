import React, { Component } from "react";
import NewTwitt from "./newTwitt";
import TwittsList from "./twittsList";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

let mockedTwitts = [];

const URL = "https://fullstack-web-course.ew.r.appspot.com/tweet";

class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      postedTwitts: mockedTwitts,
    };
  }

  async componentDidMount() {
    const data = await axios.get(`${URL}`);
    const postedTwittsFromServer = await data.data.tweets;
    this.setState({ postedTwitts: postedTwittsFromServer });
  }

  async handleNewTwitt(twitt) {
    let newpostedTwitts = [...this.state.postedTwitts];
    try {
      const response = await axios.post(`${URL} +s`, twitt);
      newpostedTwitts = [response.data, ...newpostedTwitts];
      console.log("respose", response.data);
      this.setState({ postedTwitts: newpostedTwitts });
    } catch (exeption) {
      if (exeption.response && exeption.response.status === 404)
        return toast.error("Information not found!!");
      else toast.error("Unexpected error, please try again!");
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
        <NewTwitt onNewTwitt={(twitt) => this.handleNewTwitt(twitt)}></NewTwitt>
        <TwittsList list={postedTwitts}></TwittsList>
      </React.Fragment>
    );
  }
}

export default MainPage;
