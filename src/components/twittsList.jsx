import React from "react";
import PostedTwitt from "./postedTwitt";

const TwittsList = (props) => {
  const sortedData = props.list.sort((a, b) => a.createdAt - b.createdAt);
  return (
    <React.Fragment>
      {sortedData.map((twitt) => (
        <PostedTwitt key={twitt.id} twitt={twitt} />
      ))}
    </React.Fragment>
  );
};

export default TwittsList;
