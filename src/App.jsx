import "./App.scss";
import queryString from "query-string";
import { React } from "react";
import { QueryClientProvider } from "react-query";

import DeleteGroups from "./components/GroupeSelector/DeleteGroups";
import GroupSelector from "./components/GroupeSelector/GroupSelector";
import CompareSchedule from "./components/Schedule/CompareSchedule";
import ShareUrl from "./components/Share/ShareUrl";
import queryClient from "./utils/queryClient";
import { useLocalStorage } from "./utils/useLocalStorage";

function App() {
  const [groups, setGroups] = useLocalStorage("saved-groups", {});

  // Initial loading
  if (window.location.search !== "") {
    const { groups: JSONGroups } = queryString.parse(window.location.search);
    const groups = JSON.parse(JSONGroups);
    setGroups((oldGroups) => ({ ...oldGroups, ...groups }));
    window.location.search = "";
  }

  return (
    <QueryClientProvider client={queryClient}>
      <GroupSelector
        groupId={0}
        addGroup={(group) => {
          console.info("Adding group", group);
          setGroups((oldList) => ({ ...oldList, [group.id]: group.name }));
        }}
      />

      <DeleteGroups groups={groups} onClick={() => setGroups({})} />
      <ShareUrl groups={groups} />

      <CompareSchedule groups={groups} />
    </QueryClientProvider>
  );
}

export default App;
