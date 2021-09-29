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
        <code style={{ display: "inline" }}>Code source</code>
      </a>{" "}
      par <a href="https://nathanaelhoun.fr/">@nathanaelhoun</a>.{" "}
    </p>
  </div>
);

export default Title;
