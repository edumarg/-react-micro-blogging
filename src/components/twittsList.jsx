import React, { useContext } from "react";
import PostedTwitt from "./postedTwitt";
import TwittContext from "../context/twittContext";

const TwittsList = (props) => {
  const twittContext = useContext(TwittContext);

  return (
    <React.Fragment>
      {twittContext.list.map((twitt) => (
        <PostedTwitt key={twitt.id} twitt={twitt} />
      ))}
    </React.Fragment>
  );
};

export default TwittsList;
