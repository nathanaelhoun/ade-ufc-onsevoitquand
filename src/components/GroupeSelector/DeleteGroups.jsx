import { PropTypes } from "prop-types";
import React from "react";

const DeleteGroups = ({ groups }) => {
  const nbGroups = Object.keys(groups).length;
  return <button disabled={nbGroups === 0}>Supprimer les {nbGroups} groupes enregistrés</button>;
};

DeleteGroups.propTypes = {
  groups: PropTypes.object,
};

export default DeleteGroups;
