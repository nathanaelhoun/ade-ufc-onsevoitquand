import "./App.scss";
import { React } from "react";
import { QueryClientProvider } from "react-query";

import CompareEdt from "./components/Edt/CompareEdt";
import GroupSelector from "./components/GroupeSelector/GroupSelector";
import queryClient from "./utils/queryClient";
import { useLocalStorage } from "./utils/useLocalStorage";

function App() {
  const [groups, setGroups] = useLocalStorage("saved-groups", {});

  return (
    <QueryClientProvider client={queryClient}>
      <GroupSelector
        groupId={0}
        addGroup={(group) => {
          console.info("Adding group", group);
          setGroups((oldList) => ({ ...oldList, [group.id]: group.name }));
        }}
      />

      <CompareEdt groups={groups} />
    </QueryClientProvider>
  );
}

export default App;
