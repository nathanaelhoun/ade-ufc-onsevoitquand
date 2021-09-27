import { PropTypes } from "prop-types";
import React from "react";

const ShareUrl = ({ groups }) => {
  function copyUrlToClipboard() {
    const url = window.location.href + "?groups=" + JSON.stringify(groups);

    if ("clipboard" in navigator) {
      navigator.clipboard.writeText(url);
      alert("URL à partager copiée dans le presse-papier");
      return;
    }

    alert(`Envoyez ${url} pour partager cette comparaison`);
  }

  return (
    <button onClick={copyUrlToClipboard} disabled={Object.keys(groups).length === 0}>
      Partager cette comparaison
    </button>
  );
};

ShareUrl.propTypes = {
  groups: PropTypes.object,
};

export default ShareUrl;
