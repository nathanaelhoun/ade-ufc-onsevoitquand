import React, { useState } from "react";

import { useQuery } from "react-query";
import { makeGetSubgroups } from "../../utils/ufc-edt";
import Error from "../miscellaneous/Error";
import Loading from "../miscellaneous/Loading";

const GroupSelector = ({ initialID, addGroup }) => {
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

  if (isLoading) return <Loading />;
  if (isError) return <Error />;

  if (groupList.length === 0) {
    return (
      <div>
        <button
          onClick={() => {
            addGroup(currentChoice);
            setCurrentChoice({ id: initialID, name: "UFC" });
            setPreviousChoice({ id: 0, name: "UFC" });
          }}
        >
          Ajouter le groupe {currentChoice.name}
        </button>

        <button
          onClick={() => {
            setCurrentChoice(previousChoice);
          }}
        >
          Revenir en arrière
        </button>
      </div>
    );
  }

  return (
    <div>
      <select
        name="select-group"
        id="select-group"
        onChange={({ target }) => {
          setPreviousChoice(currentChoice);
          setCurrentChoice({
            id: target.value,
            name: target.options[target.selectedIndex].text.replace(/^(Retour à)/, ""),
          });
        }}
      >
        {previousChoice && (
          <option value={previousChoice.id}>Retour à {previousChoice.name}</option>
        )}

        {groupList.map((el) => (
          <option key={el.id} value={el.id}>
            {el.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default GroupSelector;
