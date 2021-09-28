import React from "react";

import "./Title.scss";

const Title = () => (
  <div id="title">
    <div>
      <h1>OnSeVoitQuand?</h1>
      <img src="/logo192.png" alt="Icône de calendrier" height="50px" />
    </div>
    <p>
      Trouver un créneau pour se voir entre étudiants de l'
      <abbr title="Université de Franche-Comté">UFC</abbr>. Par{" "}
      <a href="https://nathanaelhoun.fr/">@nathanaelhoun</a>.{" "}
      <a href="https://github.com/nathanaelhoun/ade-ufc-onsevoitquand/">
        <code>Code source.</code>
      </a>
    </p>
  </div>
);

export default Title;
