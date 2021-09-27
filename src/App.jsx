import "./App.scss";
import { QueryClientProvider } from "react-query";
import { useState } from "react";

import queryClient from "./utils/queryClient";
import CompareEdt from "./components/Edt/CompareEdt";
import GroupSelector from "./components/GroupeSelector/GroupSelector";

function App() {
  const [groups, setGroups] = useState([]);

  return (
    <QueryClientProvider client={queryClient}>
      <GroupSelector
        groupId={0}
        addGroup={(group) => {
          console.info("Addind group", group);
          setGroups((oldList) => {
            oldList.push(group);
            return oldList;
          });
        }}
      />

      <CompareEdt groupIds={groups.map((el) => el.id)} />
    </QueryClientProvider>
  );
}

export default App;
