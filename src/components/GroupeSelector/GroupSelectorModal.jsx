import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useTheme } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Box } from "@mui/system";
import { PropTypes } from "prop-types";
import React, { useState } from "react";
import { useQuery } from "react-query";

import { makeGetSubgroups } from "../../utils/ufc-edt";
import Error from "../miscellaneous/Error";

const GroupSelectorModal = ({ isOpen, handleClose, initialID, addGroup }) => {
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

	const [inputValue, setInputValue] = useState("");
	const [currentID, setCurrentID] = useState(initialID);
	const [choices, setChoices] = useState([]);

	const {
		data: groupList,
		isLoading,
		isError,
	} = useQuery(["group", currentID], makeGetSubgroups(currentID));

	if (isError) return <Error />;

	const options = groupList ? groupList?.map((el) => ({ value: el.id, label: el.name })) : [];

	return (
		<Dialog
			fullScreen={fullScreen}
			open={isOpen}
			onClose={handleClose}
			aria-labelledby="responsive-dialog-title"
			fullWidth={true}
		>
			<DialogTitle id="responsive-dialog-title">Ajouter un groupe</DialogTitle>

			<DialogContent
				style={{
					minHeight: "25rem",
				}}
			>
				<Box sx={{ mb: "1rem" }}>
					Vous pouvez choisir un groupe qui en englobe plusieurs. Attention cependant : s'il est
					trop haut dans la hiérarchie, l'application ne pourra pas charger les emplois du temps.
				</Box>

				{choices.map((group) => (
					<Autocomplete
						key={group.id}
						sx={{ my: 2 }}
						options={[]}
						inputValue={group.name}
						renderInput={(params) => <TextField {...params} label="Groupe choisi" />}
						disabled={true}
					/>
				))}

				{(isLoading || options.length > 0) && (
					<Autocomplete
						options={options}
						loading={isLoading}
						value={null}
						inputValue={inputValue}
						onInputChange={(ev, newInput) => setInputValue(newInput)}
						onChange={selectGroup}
						openOnFocus
						renderInput={(params) => (
							<TextField
								{...params}
								label="Choisissez un groupe"
								InputProps={{
									...params.InputProps,
									endAdornment: (
										<>
											{isLoading && <CircularProgress color="inherit" size={20} />}
											{params.InputProps.endAdornment} {/** TODO keep ?*/}
										</>
									),
								}}
							/>
						)}
					/>
				)}
			</DialogContent>

			<DialogActions>
				<Button onClick={clearAndClose}>Annuler</Button>
				<Button disabled={isLoading || choices.length === 0} onClick={validateAndClose}>
					Ajouter le groupe {choices[choices.length - 1]?.name}
				</Button>
			</DialogActions>
		</Dialog>
	);

	function selectGroup(_, newGroup) {
		setChoices((old) => [...old, { id: newGroup.value, name: newGroup.label }]);
		setCurrentID(newGroup.value);
		setInputValue("");
	}

	function clearAndClose() {
		setChoices([]);
		setCurrentID(initialID);
		handleClose();
	}

	function validateAndClose() {
		addGroup({
			id: currentID,
			path: choices.map(({ name }) => name),
		});
		clearAndClose();
	}
};

GroupSelectorModal.propTypes = {
	initialID: PropTypes.number,
	addGroup: PropTypes.func,
	isOpen: PropTypes.bool,
	handleClose: PropTypes.func,
};

export default GroupSelectorModal;
