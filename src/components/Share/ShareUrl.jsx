import { PropTypes } from "prop-types";
import React, { useState } from "react";

function shareWithOS(url) {
  navigator
    .share({
      title: document.title,
      text: "Quand est-ce qu'on peut se croiser ?",
      url: url,
    })
    .catch((error) => console.error("Error sharing:", error));
}

const ShareUrl = ({ groups }) => {
  const [url, setUrl] = useState();

  function shareUrl() {
    const url =
      window.location.href.replace(/[?]$/, "") +
      "?groups=" +
      encodeURIComponent(JSON.stringify(groups));

    if (navigator.share) {
      shareWithOS(url);
      return;
    }

    if ("clipboard" in navigator) {
      navigator.clipboard.writeText(url);
      alert("URL copiée dans le presse-papier");
      return;
    }

    setUrl(url);
  }

  return (
    <>
      <button onClick={shareUrl} disabled={Object.keys(groups).length === 0}>
        Partager cette comparaison
      </button>

      {url && <pre>{url}</pre>}
    </>
  );
};

ShareUrl.propTypes = {
  groups: PropTypes.object,
};

export default ShareUrl;
