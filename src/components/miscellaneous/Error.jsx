import { PropTypes } from "prop-types";
import React from "react";

const Error = ({ msg = "Erreur" }) => {
	return <span>{msg}</span>;
};

Error.propTypes = {
	msg: PropTypes.string,
};

export default Error;
