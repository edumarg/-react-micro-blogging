import React from "react";

const PstedTwitt = (props) => {
  const { twitt } = props;
  return (
    <React.Fragment>
      <div className="row">
        <div className="card my-card col-sm-6 mx-auto my-2">
          <div className="card-body">
            <h5 className="card-title d-flex justify-content-between">
              <span className="mr-3">{twitt.userName}</span>
              <span>{twitt.date}</span>
            </h5>
            <p className="card-text">{twitt.content}</p>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default PstedTwitt;
