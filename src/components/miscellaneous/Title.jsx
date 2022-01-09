import React from "react";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";

import "./Title.scss";

const Title = () => (
	<div id="title">
		<div>
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
		<p>
			Trouver un créneau pour se voir entre étudiants de l'
			<abbr title="Université de Franche-Comté">UFC</abbr>.{" "}
			<a href="https://github.com/nathanaelhoun/ade-ufc-onsevoitquand/">
				<code>Code source</code>
			</a>{" "}
			par <a href="https://nathanaelhoun.fr/">@nathanaelhoun</a>. Icône et styles : bibliothèque{" "}
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
);

export default Title;
