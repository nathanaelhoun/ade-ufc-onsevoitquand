import { PropTypes } from "prop-types";
import React from "react";

import "./Loading.scss";

const Loading = ({ msg = "Chargement..." }) => {
  return (
    <div className="loading">
      <>{msg}</>
    </div>
  );
};

Loading.propTypes = {
  msg: PropTypes.string,
};

export default Loading;
