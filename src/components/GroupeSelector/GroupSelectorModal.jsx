import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { PropTypes } from "prop-types";
import React, { useState } from "react";
import { useQuery } from "react-query";
import Select from "react-select";

import { makeGetSubgroups } from "../../utils/ufc-edt";
import Error from "../miscellaneous/Error";

const GroupSelectorModal = ({ isOpen, handleClose, initialID, addGroup }) => {
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

	const [value, setValue] = useState();
	const [previousChoices, setPreviousChoices] = useState([]);
	const [currentChoice, setCurrentChoice] = useState({
		id: initialID,
		name: "UFC",
	});

	const {
		data: groupList,
		isLoading,
		isError,
	} = useQuery(["group", currentChoice.id], makeGetSubgroups(currentChoice.id));

	if (isError) return <Error />;

	const options = groupList ? groupList.map((el) => ({ value: el.id, label: el.name })) : [];

	const placeholder = isLoading
		? "Chargement"
		: groupList.length === 0
		? "Plus de choix"
		: "Choisissez un groupe";

	return (
		<Dialog
			fullScreen={fullScreen}
			open={isOpen}
			onClose={handleClose}
			aria-labelledby="responsive-dialog-title"
			fullWidth={true}
		>
			<DialogTitle id="responsive-dialog-title">Choisissez un groupe à rajouter</DialogTitle>

			<DialogContent
				style={{
					minHeight: "25rem",
				}}
			>
				<Select
					value={value}
					id="group-select"
					maxMenuHeight="20rem"
					isLoading={isLoading}
					isDisabled={!isLoading && groupList.length === 0}
					placeholder={placeholder}
					options={options}
					onChange={selectValue}
				/>

				<Button
					variant="outlined"
					size="small"
					disabled={isLoading || previousChoices.length === 0}
					onClick={() => setCurrentChoice(popPreviousChoice)}
					startIcon={<ArrowBackIcon />}
				>
					Revenir à {previousChoices[previousChoices.length - 1]?.name}
				</Button>
			</DialogContent>

			<DialogActions>
				<Button onClick={handleClose}>Annuler</Button>
				<Button
					disabled={isLoading || groupList.length !== 0}
					onClick={() => {
						addGroup({ id: currentChoice.id, name: getGroupPath() });
						handleClose();
					}}
				>
					Ajouter le groupe
				</Button>
			</DialogActions>
		</Dialog>
	);

	function popPreviousChoice() {
		const lastPreviousChoice = previousChoices[previousChoices.length - 1];
		setPreviousChoices((previousChoices) => previousChoices.slice(0, -1));
		return lastPreviousChoice;
	}

	function getGroupPath() {
		return [...previousChoices.slice(1), currentChoice].map(({ name }) => name).join(" > ");
	}

	function selectValue({ value, label }) {
		setPreviousChoices((old) => [...old, currentChoice]);
		setCurrentChoice({ id: value, name: label });
		setValue(null);
	}
};

GroupSelectorModal.propTypes = {
	initialID: PropTypes.number,
	addGroup: PropTypes.func,
	isOpen: PropTypes.bool,
	handleClose: PropTypes.func,
};

export default GroupSelectorModal;
