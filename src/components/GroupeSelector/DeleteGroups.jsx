import { PropTypes } from "prop-types";
import React from "react";

import "./DeleteGroups.scss";

const DeleteGroups = ({ groups, setGroups }) => {
  const nbGroups = Object.keys(groups).length;

  if (nbGroups === 0) {
    return <button disabled={true}>Commencez par ajouter un groupe</button>;
  }

  return (
    <div className="delete-buttons">
      <label>Supprimer des groupes :</label>
      {Object.keys(groups).map((groupID) => (
        <button
          key={groupID}
          onClick={() => {
            setGroups((oldGroups) => {
              delete oldGroups[groupID];
              return oldGroups;
            });
          }}
        >
          Supprimer {groups[groupID]}
        </button>
      ))}
    </div>
  );
};

DeleteGroups.propTypes = {
  groups: PropTypes.object,
  setGroups: PropTypes.func,
};

export default DeleteGroups;
