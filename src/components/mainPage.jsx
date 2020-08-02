import React, { Component } from "react";
import NewTwitt from "./newTwittForm";
import TwittsList from "./twittsList";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import config from "../config.json";
import TwittContext from "../context/twittContext";

class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      postedTwitts: [],
      hideSpinner: false,
      currentUser: this.props.currentUser,
    };
  }

  async componentDidMount() {
    const data = await axios.get(`${config.URL}`);
    const postedTwittsFromServer = await data.data.tweets;
    this.setState({ postedTwitts: postedTwittsFromServer });
    this.getTwitts = setInterval(async () => {
      const data = await axios.get(`${config.URL}`);
      const postedTwittsFromServer = await data.data.tweets;
      this.setState({ postedTwitts: postedTwittsFromServer });
    }, 30000);
  }

  componentWillUnmount() {
    clearInterval(this.getTwitts);
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
      this.setState({ postedTwitts: newPostedTwitts });
    } catch (exeption) {
      if (exeption.response && exeption.response.status === 404) {
        NewHideSpinner = false;
        toast.error("Information not found!!");
      } else {
        NewHideSpinner = false;
        toast.error("Unexpected error, please try again!");
      }
    }
    this.setState({ hideSpinner: NewHideSpinner });
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
        <TwittContext.Provider
          value={{
            onNewTwitt: (twitt) => this.handleNewTwitt(twitt),
            hideSpinner: this.state.hideSpinner,
            currentUser: this.state.currentUser,
            list: postedTwitts,
          }}
        >
          <NewTwitt className="mx-5"></NewTwitt>
          <TwittsList />
        </TwittContext.Provider>
      </React.Fragment>
    );
  }
}

export default MainPage;
