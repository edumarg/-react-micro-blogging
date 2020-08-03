import React, { Component } from "react";
import NewTwitt from "./newTwittForm";
import TwittsList from "./twittsList";
// import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
// import config from "../config.json";
import TwittContext from "../context/twittContext";
import firebase from "firebase";

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
    console.log("did mount");
    const db = firebase.firestore();
    const snapshot = await db.collection("posts").get();

    const postedTwittsFromServer = snapshot.docs.map((post) => {
      return {
        id: post.id,
        userName: post.data().userName,
        date: post.data().date,
        content: post.data().content,
      };
    });
    console.log(postedTwittsFromServer);

    this.setState({ postedTwitts: postedTwittsFromServer });
  }

  componentWillUnmount() {
    clearInterval(this.getTwitts);
  }

  async handleNewTwitt(twitt) {
    let NewHideSpinner = this.state.hideSpinner;
    NewHideSpinner = true;
    this.setState({ hideSpinner: NewHideSpinner });
    try {
      const db = firebase.firestore();
      await db.collection("posts").add(twitt);
      NewHideSpinner = false;
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

  // async handleNewTwitt(twitt) {
  //   let NewHideSpinner = this.state.hideSpinner;
  //   NewHideSpinner = true;
  //   this.setState({ hideSpinner: NewHideSpinner });
  //   try {
  //     let newPostedTwitts = [...this.state.postedTwitts];
  //     const response = await axios.post(`${config.URL}`, twitt);
  //     newPostedTwitts = [response.data, ...newPostedTwitts];
  //     NewHideSpinner = false;
  //     this.setState({ postedTwitts: newPostedTwitts });
  //   } catch (exeption) {
  //     if (exeption.response && exeption.response.status === 404) {
  //       NewHideSpinner = false;
  //       toast.error("Information not found!!");
  //     } else {
  //       NewHideSpinner = false;
  //       toast.error("Unexpected error, please try again!");
  //     }
  //   }
  //   this.setState({ hideSpinner: NewHideSpinner });
  // }

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
