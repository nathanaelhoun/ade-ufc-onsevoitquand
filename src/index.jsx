import queryString from "query-string";
import React from "react";
import ReactDOM from "react-dom";

import App from "./App";

// Initial loading from URL
if (window.location.search !== "") {
  const { groups: JSONGroups } = queryString.parse(window.location.search);
  const groups = JSON.parse(JSONGroups);
  localStorage.setItem("saved-groups", JSON.stringify(groups));
  window.location.search = "";
} else {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById("root")
  );
}
