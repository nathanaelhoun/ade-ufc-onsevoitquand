import "./App.scss";
import { React } from "react";
import { QueryClientProvider } from "react-query";

import GroupSelector from "./components/GroupeSelector/GroupSelector";
import CompareSchedule from "./components/Schedule/CompareSchedule";
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

      <CompareSchedule groups={groups} />
    </QueryClientProvider>
  );
}

export default App;
