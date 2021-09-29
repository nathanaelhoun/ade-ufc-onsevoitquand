import "./App.scss";
import queryString from "query-string";
import { React } from "react";
import { QueryClientProvider } from "react-query";
import ReactTooltip from "react-tooltip";

import DeleteGroups from "./components/GroupeSelector/DeleteGroups";
import GroupSelector from "./components/GroupeSelector/GroupSelector";
import Footer from "./components/miscellaneous/Footer";
import Title from "./components/miscellaneous/Title";
import CompareSchedule from "./components/Schedule/CompareSchedule";
import ShareUrl from "./components/Share/ShareUrl";
import queryClient from "./utils/queryClient";
import { useLocalStorage } from "./utils/useLocalStorage";

const lsKey = "saved-groups";

function App() {
  // Initial loading from URL
  if (window.location.search !== "") {
    const { groups: JSONGroups } = queryString.parse(window.location.search);
    const groups = JSON.parse(JSONGroups);
    localStorage.setItem(lsKey, JSON.stringify(groups));
    window.location.search = "";
  }

  const [groups, setGroups] = useLocalStorage(lsKey, {});

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
          <hr />
          <DeleteGroups groups={groups} setGroups={setGroups} />
          <hr />
          <ShareUrl groups={groups} />
        </div>
      </header>

      <main>
        <CompareSchedule groups={groups} />
      </main>

      <Footer />

      <ReactTooltip multiline effect="solid" />
    </QueryClientProvider>
  );
}

export default App;
