import { PropTypes } from "prop-types";
import React from "react";

const ControlledInput = ({ id, value, handleInput, children, ...props }) => {
	return (
		<div className="config-item" {...props}>
			<input
				type="number"
				name={id}
				id={id}
				value={value}
				onChange={handleInput}
				style={{ maxWidth: "10ch" }}
			/>
			<label style={{ marginLeft: "1ch" }} htmlFor={id}>
				{children}
			</label>
		</div>
	);
};

ControlledInput.propTypes = {
	id: PropTypes.string.isRequired,
	value: PropTypes.any.isRequired,
	handleInput: PropTypes.func.isRequired,
	children: PropTypes.element,
};

export default ControlledInput;
