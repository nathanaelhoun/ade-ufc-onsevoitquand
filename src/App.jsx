import { React } from "react";
import { QueryClientProvider } from "react-query";
import ReactTooltip from "react-tooltip";

import "./App.scss";
import DeleteGroups from "./components/GroupeSelector/DeleteGroups";
import GroupSelector from "./components/GroupeSelector/GroupSelector";
import ControlledCheckbox from "./components/miscellaneous/ControlledCheckbox";
import ControlledInput from "./components/miscellaneous/ControlledInput";
import Footer from "./components/miscellaneous/Footer";
import Title from "./components/miscellaneous/Title";
import CompareSchedule from "./components/Schedule/CompareSchedule";
import ShareUrl from "./components/Share/ShareUrl";
import queryClient from "./utils/queryClient";
import { useLocalStorage } from "./utils/useLocalStorage";

function App() {
  const [config, setConfig] = useLocalStorage("config", { isCompact: true, nbWeeks: 2 });
  const [groups, setGroups] = useLocalStorage("saved-groups", {});

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

          <div id="config">
            <ControlledCheckbox
              id="config-compact"
              value={config.isCompact}
              handleInput={(ev) => setConfig((old) => ({ ...old, isCompact: ev.target.checked }))}
              data-tip="Cache les heures libres dans tous les emplois du temps en début et en fin de journée"
            >
              <>Économiser de la place</>
            </ControlledCheckbox>
            <ControlledInput
              id="config-weeks"
              value={config.nbWeeks}
              handleInput={(ev) =>
                setConfig((old) => ({ ...old, nbWeeks: parseInt(ev.target.value) }))
              }
              data-tip="Nombre de semaines à afficher dans la comparaison"
            >
              <>Nombre de semaines</>
            </ControlledInput>
          </div>
        </div>
      </header>

      <main>
        <CompareSchedule groups={groups} config={config} />
      </main>

      <Footer />

      <ReactTooltip multiline effect="solid" />
    </QueryClientProvider>
  );
}

export default App;
