import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import SettingsIcon from "@mui/icons-material/Settings";
import { AppBar, Toolbar, IconButton, Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { PropTypes } from "prop-types";
import React from "react";

import "./HeaderBar.scss";

const HeaderBar = ({ openSettings }) => (
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
				<span className="mobile">
					un appui long sur les noms de groupe raccourcis fait apparaître le nom entier.
				</span>
				<span className="desktop">
					au survol des noms de groupes raccourcis, les noms entiers apparaissent.
				</span>
			</p>
		</div>
	</>
);

HeaderBar.propTypes = {
	openSettings: PropTypes.func,
};

export default HeaderBar;
