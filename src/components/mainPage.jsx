import React, { Component } from "react";
import NewTwitt from "./newTwittForm";
import TwittsList from "./twittsList";
import { ToastContainer, toast } from "react-toastify";
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

  unsubscribe = null;

  async componentDidMount() {
    const db = firebase.firestore();

    this.unsubscribe = db
      .collection("posts")
      .orderBy("date", "desc")
      .limit(10)
      .onSnapshot((snapshot) => {
        const postedTwittsFromServer = snapshot.docs.map((post) => {
          return {
            id: post.id,
            userName: post.data().userName,
            date: post.data().date,
            content: post.data().content,
          };
        });
        this.setState({ postedTwitts: postedTwittsFromServer });
      });
  }

  componentWillUnmount() {
    this.unsubscribe();
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
