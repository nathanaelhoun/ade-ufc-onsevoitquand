import { PropTypes } from "prop-types";
import React from "react";

const ControlledCheckbox = ({ id, value, handleInput, children, ...props }) => {
	return (
		<div className="config-item" {...props}>
			<input type="checkbox" name={id} id={id} checked={value} onChange={handleInput} />
			<label htmlFor={id}>{children}</label>
		</div>
	);
};

ControlledCheckbox.propTypes = {
	id: PropTypes.string.isRequired,
	value: PropTypes.bool.isRequired,
	handleInput: PropTypes.func.isRequired,
	children: PropTypes.element,
};

export default ControlledCheckbox;
