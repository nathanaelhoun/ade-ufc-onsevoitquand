import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import GroupIcon from "@mui/icons-material/Group";
import SettingsIcon from "@mui/icons-material/Settings";
import { AppBar, Toolbar, IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { PropTypes } from "prop-types";
import React from "react";

import "./HeaderBar.scss";

const HeaderBar = ({ openSettings, config }) => (
	<>
		<Box sx={{ flexGrow: 1 }} component="header">
			<AppBar position="static">
				<Toolbar>
					<IconButton
						size="large"
						edge="start"
						color="inherit"
						aria-label="menu"
						sx={{ mr: 2 }}
						alt="Icône de calendrier"
					>
						<EventAvailableIcon />
					</IconButton>

					<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
						OnSeVoitQuand?
					</Typography>

					<IconButton color="inherit" onClick={openSettings}>
						<GroupIcon sx={{ mr: 1.5 }} />
						<SettingsIcon />
					</IconButton>
				</Toolbar>
			</AppBar>
		</Box>

		<div id="description">
			<p>
				Trouver un créneau pour se voir entre étudiants de l'
				<abbr title="Université de Franche-Comté">UFC</abbr>.{" "}
				<a href="https://github.com/nathanaelhoun/ade-ufc-onsevoitquand/">Code source</a> par{" "}
				<a href="https://nathanaelhoun.fr/">@nathanaelhoun</a>. Hébergé par{" "}
				<a
					href="https://app.netlify.com/sites/ade-ufc-onsevoitquand/deploys"
					target="_blank"
					rel="noreferrer"
				>
					Netlify
				</a>
				. Icône et styles : bibliothèque{" "}
				<a href="https://mui.com/" target="_blank" rel="noreferrer">
					<code>mui</code>
				</a>
				.
			</p>

			<p className="help">
				Conseil&nbsp;:{" "}
				{config.showOneSchedule ? (
					<>tu peux repasser en mode comparaison via les paramètres en haut à droite.</>
				) : (
					<>
						<span className="mobile">
							un appui sur les noms de groupe ellipsés fait apparaître le nom entier.
						</span>
						<span className="desktop">
							au survol des noms de groupes ellipsés, les noms entiers apparaissent.
						</span>
					</>
				)}
			</p>
		</div>
	</>
);

HeaderBar.propTypes = {
	openSettings: PropTypes.func,
	config: PropTypes.shape({
		nbWeeks: PropTypes.number,
		showOneSchedule: PropTypes.bool,
	}).isRequired,
};

export default HeaderBar;
