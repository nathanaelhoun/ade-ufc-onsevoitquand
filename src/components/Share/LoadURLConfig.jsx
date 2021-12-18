import { PropTypes } from "prop-types";
import queryString from "query-string";
import React, { useEffect, useState } from "react";

import "./LoadURLConfig.scss";

import { makeGetHierarchyToSubgroup } from "../../utils/ufc-edt";
import Loading from "../miscellaneous/Loading";

const LoadURLConfig = ({ originalConfig, originalGroups }) => {
  const [error, setError] = useState();
  // This function should be called only once
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => loadConfig(), []);

  if (error) {
    return (
      <div className="center-fullscreen">
        <p className="error">{error}</p>

        <p>
          <a href={window.location.pathname}>Relancer l'application</a>
        </p>
      </div>
    );
  }

  return (
    <div className="center-fullscreen">
      <Loading msg="Initialisation des groupes en cours" />
    </div>
  );

  /**
   * Load initial configuration
   */
  async function loadConfig() {
    console.info("Loading config from URL");

    if (originalGroups != null && Object.keys(originalGroups).length > 0) {
      const hasConfirmed = window.confirm(
        "Si tu continues, les groupes que tu avais configuré auparavant vont être supprimés." +
          "\nPour les sauvegarder, retourne dans l'application, crée un lien de partage et sauvegarde-le dans tes notes avant d'importer ces nouveaux groupes." +
          "\n\nContinuer l'import et écraser les groupes actuels ?"
      );

      if (!hasConfirmed) {
        window.location.search = "";
      }
    }

    let groupsFromJSON = {};
    let groupsFromIDs = {};

    const { groups: JSONGroups, ids } = queryString.parse(window.location.search);

    if (JSONGroups) {
      console.info("Using legacy all groups info");
      try {
        // Method 1: all informations from URL. Keep for backward compatibilty
        groupsFromJSON = JSON.parse(JSONGroups);
      } catch (error) {
        console.error(error, "full groups (legacy)", JSONGroups);
        setError(
          "Impossible de charger les groupes depuis le lien.\n\nEssaie en copiant-collant directement le lien dans ton navigateur, ou ajoute les groupes manuellement"
        );
        return;
      }
    }

    // Method 2: with ID, and query for group information
    if (ids) {
      console.info("Using group Ids", ids);

      try {
        if (ids instanceof Array) {
          const arrayGroupsFromIDs = await Promise.all(
            ids.map((id) => makeGetHierarchyToSubgroup(id)())
          );
          groupsFromIDs = arrayGroupsFromIDs.reduce((prev, group) => ({ ...prev, ...group }), {});
        } else {
          groupsFromIDs = await makeGetHierarchyToSubgroup(ids)();
        }
      } catch (error) {
        console.error(error, "groups ids (v2)", ids);
        setError(
          "Un erreur est arrivée lors pendant le chargement des groupes depuis le lien.\n\nMerci de signaler l'erreur au développeur ! En attendant, tu peux sélectionner les groupes manuellement"
        );
        return;
      }
    }

    // Save to localstorage and reload app
    const newGroups = { ...groupsFromJSON, ...groupsFromIDs };

    if (Object.keys(newGroups).length > 0) {
      localStorage.setItem("saved-groups", JSON.stringify(newGroups));
    }

    window.location.search = "";
  }
};

LoadURLConfig.propTypes = {
  originalGroups: PropTypes.object,
  originalConfig: PropTypes.object,
};

export default LoadURLConfig;
