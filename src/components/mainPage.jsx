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
      hideSpinner: false,
    };
  }

  async componentDidMount() {
    const data = await axios.get(`${URL}`);
    const postedTwittsFromServer = await data.data.tweets;
    this.setState({ postedTwitts: postedTwittsFromServer });
  }

  async handleNewTwitt(twitt) {
    let NewHideSpinner = this.state.hideSpinner;
    NewHideSpinner = true;
    this.setState({ hideSpinner: NewHideSpinner });
    try {
      let newPostedTwitts = [...this.state.postedTwitts];
      const response = await axios.post(`${URL}`, twitt);

      newPostedTwitts = [response.data, ...newPostedTwitts];
      NewHideSpinner = false;
      this.setState({ hideSpinner: NewHideSpinner });
    } catch (exeption) {
      NewHideSpinner = false;
      // this.setState({ hideSpinner: NewHideSpinner });
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
