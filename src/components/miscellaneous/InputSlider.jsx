import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import MuiInput from "@mui/material/Input";
import Slider from "@mui/material/Slider";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { PropTypes } from "prop-types";
import * as React from "react";

const Input = styled(MuiInput)`
	width: 42px;
`;

const inputProps = {
	step: 1,
	min: 1,
	max: 20,
};

const InputSlider = ({ title, icon, value, setValue }) => {
	const handleSliderChange = (_event, newValue) => {
		setValue(newValue);
	};

	const handleInputChange = (event) => {
		setValue(event.target.value === "" ? "" : Number(event.target.value));
	};

	const handleBlur = () => {
		if (value < 0) {
			setValue(0);
		} else if (value > 100) {
			setValue(100);
		}
	};

	return (
		<Box>
			<Typography id="input-slider" gutterBottom>
				{title}
			</Typography>
			<Grid container spacing={2} alignItems="center">
				<Grid item>{icon}</Grid>
				<Grid item xs>
					<Slider
						value={typeof value === "number" ? value : 0}
						onChange={handleSliderChange}
						aria-labelledby="input-slider"
						{...inputProps}
					/>
				</Grid>
				<Grid item>
					<Input
						value={value}
						size="small"
						onInput={handleInputChange}
						onBlur={handleBlur}
						inputProps={{
							...inputProps,
							type: "number",
							"aria-labelledby": "input-slider",
						}}
					/>
				</Grid>
			</Grid>
		</Box>
	);
};

InputSlider.propTypes = {
	title: PropTypes.string,
	icon: PropTypes.object,
	value: PropTypes.number.isRequired,
	setValue: PropTypes.func.isRequired,
};

export default InputSlider;
