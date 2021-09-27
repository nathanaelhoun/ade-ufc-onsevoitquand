import { PropTypes } from "prop-types";
import React, { useState } from "react";
import { useQuery } from "react-query";
import Select from "react-select";

import "./GroupSelector.scss";

import { makeGetSubgroups } from "../../utils/ufc-edt";
import Error from "../miscellaneous/Error";

const GroupSelector = ({ initialID, addGroup }) => {
  const [value, setValue] = useState();
  const [previousChoices, setPreviousChoices] = useState([]);
  const [currentChoice, setCurrentChoice] = useState({
    id: initialID,
    name: "UFC",
  });

  function popPreviousChoice() {
    const lastPreviousChoice = previousChoices[previousChoices.length - 1];
    setPreviousChoices((previousChoices) => previousChoices.slice(0, -1));
    return lastPreviousChoice;
  }

  function getGroupPath() {
    return [...previousChoices.slice(1), currentChoice].map(({ name }) => name).join(" > ");
  }

  function selectValue({ value, label }) {
    setPreviousChoices((old) => [...old, currentChoice]);
    setCurrentChoice({ id: value, name: label });
    setValue(null);
  }

  const {
    data: groupList,
    isLoading,
    isError,
  } = useQuery(["group", currentChoice.id], makeGetSubgroups(currentChoice.id));

  if (isError) return <Error />;

  const options = groupList ? groupList.map((el) => ({ value: el.id, label: el.name })) : [];

  return (
    <div className="group-selector">
      <div id="group-select-wrapper">
        <Select
          value={value}
          id="group-select"
          maxMenuHeight="100%"
          isLoading={isLoading}
          isDisabled={!isLoading && groupList.length === 0}
          placeholder={isLoading ? "Chargement..." : "Choisissez un groupe"}
          options={options}
          onChange={selectValue}
        />
      </div>

      <button
        disabled={isLoading || previousChoices.length === 0}
        onClick={() => setCurrentChoice(popPreviousChoice)}
      >
        Revenir à {previousChoices[previousChoices.length - 1]?.name}
      </button>

      <button
        disabled={isLoading || groupList.length !== 0}
        onClick={() => {
          addGroup({ id: currentChoice.id, name: getGroupPath() });
        }}
      >
        Ajouter le groupe {getGroupPath()}
      </button>
    </div>
  );
};

GroupSelector.propTypes = {
  initialID: PropTypes.number,
  addGroup: PropTypes.func,
};

export default GroupSelector;
