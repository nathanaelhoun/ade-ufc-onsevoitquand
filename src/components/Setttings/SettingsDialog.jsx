import DeleteIcon from "@mui/icons-material/Delete";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Typography, IconButton, List, ListItem } from "@mui/material";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Button from "@mui/material/Button";
import { red } from "@mui/material/colors";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { PropTypes } from "prop-types";
import React, { useState } from "react";

import InputSlider from "../miscellaneous/InputSlider";

import GroupSelectorModal from "./GroupSelectorModal";

const SettingsDialog = ({ open, onClose, config, setConfig, groups, setGroups }) => {
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

	const [isAddGroupModalOpened, setIsAddGroupModalOpened] = useState(false);

	return (
		<>
			<Dialog
				open={open}
				onClose={onClose}
				fullScreen={fullScreen}
				fullWidth={true}
				aria-labelledby="settings-title"
				keepMounted
			>
				<DialogTitle id="settings-title">Paramètres</DialogTitle>

				<DialogContent id="settings-content" dividers>
					<div>
						<InputSlider
							title="Nombre de semaines à afficher dans la comparaison"
							icon={null}
							value={config.nbWeeks}
							setValue={(value) => setConfig((old) => ({ ...old, nbWeeks: value }))}
						/>
					</div>

					<div>
						<h3>Groupes</h3>

						<List>
							{Object.keys(groups).map((groupID) => (
								<ListItem
									key={groupID}
									secondaryAction={
										<IconButton
											edge="end"
											aria-label="delete"
											onClick={() => {
												setGroups((oldGroups) => {
													delete oldGroups[groupID];
													return { ...oldGroups };
												});
											}}
											sx={{
												"&:hover": { color: red[500] },
												"&:active": { color: red[500] },
											}}
										>
											<DeleteIcon />
										</IconButton>
									}
								>
									<Breadcrumbs
										maxItems={3}
										aria-label="breadcrumb"
										separator={<NavigateNextIcon fontSize="small" />}
										component="div"
									>
										{groups[groupID].map((el) => (
											<Typography key={el}>{el}</Typography>
										))}
									</Breadcrumbs>
								</ListItem>
							))}
							<ListItem>
								<Button onClick={() => setIsAddGroupModalOpened(true)} endIcon={<GroupAddIcon />}>
									Ajouter un groupe
								</Button>
							</ListItem>
						</List>
					</div>
				</DialogContent>

				<DialogActions>
					<Button onClick={onClose}>Fermer</Button>
				</DialogActions>
			</Dialog>

			<GroupSelectorModal
				isOpen={isAddGroupModalOpened}
				handleClose={() => setIsAddGroupModalOpened(false)}
				initialID={0}
				addGroup={(group) => {
					console.info("Adding group", group);
					setGroups((oldList) => ({ ...oldList, [group.id]: group.path }));
				}}
			/>
		</>
	);
};

SettingsDialog.propTypes = {
	open: PropTypes.bool,
	onClose: PropTypes.func,
	config: PropTypes.shape({
		nbWeeks: PropTypes.number,
	}).isRequired,
	setConfig: PropTypes.func.isRequired,
	groups: PropTypes.object.isRequired,
	setGroups: PropTypes.func.isRequired,
};

export default SettingsDialog;
