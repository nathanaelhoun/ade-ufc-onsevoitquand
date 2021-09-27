import "./App.scss";
import queryString from "query-string";
import { React } from "react";
import { QueryClientProvider } from "react-query";

import DeleteGroups from "./components/GroupeSelector/DeleteGroups";
import GroupSelector from "./components/GroupeSelector/GroupSelector";
import Footer from "./components/miscellaneous/Footer";
import Title from "./components/miscellaneous/Title";
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
      <header>
        <Title />

        <div className="buttons">
          <GroupSelector
            groupId={0}
            addGroup={(group) => {
              console.info("Adding group", group);
              setGroups((oldList) => ({ ...oldList, [group.id]: group.name }));
            }}
          />

          <DeleteGroups groups={groups} setGroups={setGroups} />
          <ShareUrl groups={groups} />
        </div>
      </header>

      <main>
        <CompareSchedule groups={groups} />
      </main>

      <Footer />
    </QueryClientProvider>
  );
}

export default App;
