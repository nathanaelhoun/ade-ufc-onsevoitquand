import { PropTypes } from "prop-types";
import React, { useState } from "react";
import { useQuery } from "react-query";
import Select from "react-select";

import "./GroupSelector.scss";

import { makeGetSubgroups } from "../../utils/ufc-edt";
import Error from "../miscellaneous/Error";

const GroupSelector = ({ initialID, addGroup }) => {
  const [value, setValue] = useState();
  const [previousChoice, setPreviousChoice] = useState({ id: 0, name: "UFC" });
  const [currentChoice, setCurrentChoice] = useState({
    id: initialID,
    name: "UFC",
  });

  const {
    data: groupList,
    isLoading,
    isError,
  } = useQuery(["group", currentChoice.id], makeGetSubgroups(currentChoice.id));

  if (isError) return <Error />;

  return (
    <div className="group-selector">
      <Select
        value={value}
        id="group-select"
        maxMenuHeight="100%"
        isLoading={isLoading}
        isDisabled={!isLoading && groupList.length === 0}
        placeholder={isLoading ? "Chargement..." : "Choisissez un groupe"}
        options={isLoading ? [] : groupList.map((el) => ({ value: el.id, label: el.name }))}
        onChange={(newValue) => {
          setPreviousChoice(currentChoice);
          setCurrentChoice({ id: newValue.value, name: newValue.label });
          setValue(null);
        }}
      />

      <button disabled={isLoading} onClick={() => setCurrentChoice(previousChoice)}>
        Revenir à {previousChoice.name}
      </button>

      <button
        disabled={isLoading || groupList.length !== 0}
        onClick={() => {
          addGroup(currentChoice);
          setCurrentChoice({ id: initialID, name: "UFC" });
          setPreviousChoice({ id: 0, name: "UFC" });
        }}
      >
        Ajouter le groupe {currentChoice.name}
      </button>
    </div>
  );
};

GroupSelector.propTypes = {
  initialID: PropTypes.number,
  addGroup: PropTypes.func,
};

export default GroupSelector;
