import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import { PropTypes } from "prop-types";
import React from "react";

import "./HeaderBar.scss";
import ControlledInput from "./ControlledInput";

const HeaderBar = ({ config, setConfig }) => (
	<header>
		<div id="title">
			<h1>OnSeVoitQuand?</h1>
			<EventAvailableIcon
				id="icon"
				sx={{
					height: "50px",
					width: "50px",
				}}
				alt="Icône de calendrier"
			/>
		</div>
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

		<div id="config">
			<h3>Configuration</h3>
			<ControlledInput
				id="config-weeks"
				value={config.nbWeeks}
				handleInput={(ev) => setConfig((old) => ({ ...old, nbWeeks: parseInt(ev.target.value) }))}
				data-tip="Nombre de semaines à afficher dans la comparaison"
			>
				<>Semaines à charger</>
			</ControlledInput>
		</div>
	</header>
);

HeaderBar.propTypes = {
	config: PropTypes.shape({
		nbWeeks: PropTypes.number,
	}).isRequired,
	setConfig: PropTypes.func,
};

export default HeaderBar;
