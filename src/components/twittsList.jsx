import React, { useContext } from "react";
import PostedTwitt from "./postedTwitt";
import TwittContext from "../context/twittContext";

const TwittsList = (props) => {
  const twittContext = useContext(TwittContext);
  console.log("twitt context", twittContext);
  const sortedData = twittContext.list.sort((a, b) => a.date - b.date);
  return (
    <React.Fragment>
      {sortedData.map((twitt) => (
        <PostedTwitt key={twitt.id} twitt={twitt} />
      ))}
    </React.Fragment>
  );
};

export default TwittsList;
