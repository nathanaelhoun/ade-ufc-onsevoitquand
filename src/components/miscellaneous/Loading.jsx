import { PropTypes } from "prop-types";
import React from "react";

const Loading = ({ msg = "Chargement..." }) => {
	return (
		<div style={{ textAlign: "center", marginTop: "1em" }}>
			<>{msg}</>
		</div>
	);
};

Loading.propTypes = {
	msg: PropTypes.string,
};

export default Loading;
