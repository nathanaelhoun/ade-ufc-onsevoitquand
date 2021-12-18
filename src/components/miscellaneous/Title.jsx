import React from "react";

import "./Title.scss";
import { ReactComponent as LogoIcon } from "../../assets/logo.svg";

const Title = () => (
	<div id="title">
		<div>
			<h1>OnSeVoitQuand?</h1>
			<LogoIcon
				id="icon"
				alt="Icône de calendrier"
				height="50px"
				width="50px"
				style={{ color: "var(--text-color)" }}
			/>
		</div>
		<p>
			Trouver un créneau pour se voir entre étudiants de l'
			<abbr title="Université de Franche-Comté">UFC</abbr>.{" "}
			<a href="https://github.com/nathanaelhoun/ade-ufc-onsevoitquand/">
				<code>Code source</code>
			</a>{" "}
			par <a href="https://nathanaelhoun.fr/">@nathanaelhoun</a>.{" "}
		</p>

		<p className="help">
			Conseil : 
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
