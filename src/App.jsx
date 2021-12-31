import GroupAddIcon from "@mui/icons-material/GroupAdd";
import GroupRemoveIcon from "@mui/icons-material/GroupRemove";
import GroupsIcon from "@mui/icons-material/Groups";
import ShareIcon from "@mui/icons-material/Share";
import Fab from '@mui/material/Fab';
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import { React, useState } from "react";
import { QueryClientProvider } from "react-query";
import ReactTooltip from "react-tooltip";

import "./App.scss";
import DeleteGroups from "./components/GroupeSelector/DeleteGroups";
import GroupSelectorModal from "./components/GroupeSelector/GroupSelectorModal";
import ControlledCheckbox from "./components/miscellaneous/ControlledCheckbox";
import ControlledInput from "./components/miscellaneous/ControlledInput";
import Footer from "./components/miscellaneous/Footer";
import Title from "./components/miscellaneous/Title";
import CompareSchedule from "./components/Schedule/CompareSchedule";
import LoadURLConfig from "./components/Share/LoadURLConfig";
import queryClient from "./utils/queryClient";
import { shareGroupsUrl } from "./utils/share";
import { useLocalStorage } from "./utils/useLocalStorage";

function App() {
	const [config, setConfig] = useLocalStorage("config", { isCompact: true, nbWeeks: 2 });
	const [groups, setGroups] = useLocalStorage("saved-groups", {});
	const [error, setError] = useState();

	const [isAddGroupModalOpened, setIsAddGroupModalOpened] = useState(false);

	const loadGroups = window.location.search !== "";

	if (loadGroups) {
		return <LoadURLConfig originalConfig={config} originalGroups={groups} />;
	}

	return (
		<QueryClientProvider client={queryClient}>
			<header>
				<Title />

				<div className="buttons">
					{/* <GroupSelector
						groupId={0}
						addGroup={(group) => {
							console.info("Adding group", group);
							setGroups((oldList) => ({ ...oldList, [group.id]: group.name }));
							if (error) {
								setError(false);
							}
						}}
					/> */}
					<hr />
					<DeleteGroups groups={groups} setGroups={setGroups} />
					<hr />

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

					{error && <pre className="error">{error}</pre>}
				</div>
			</header>

			<main>
				<CompareSchedule groups={groups} config={config} />
			</main>

			<Footer />

			<GroupSelectorModal
				isOpen={isAddGroupModalOpened}
				handleClose={() => setIsAddGroupModalOpened(false)}
				groupId={0}
				addGroup={(group) => {
					console.info("Adding group", group);
					setGroups((oldList) => ({ ...oldList, [group.id]: group.name }));
					if (error) {
						setError(false);
					}
				}}
			/>

			<SpeedDial
				ariaLabel="Actions supplémentaires"
				sx={{ position: "fixed", bottom: 16, right: 16 }}
				icon={<GroupsIcon />}
				// TODO make the background darker to increase contrast lol
			>
				<SpeedDialAction
					icon={<GroupAddIcon />}
					tooltipTitle="Ajouter un groupe"
					// tooltipOpen
					onClick={() => setIsAddGroupModalOpened(true)}
				/>

				<SpeedDialAction
					icon={<GroupRemoveIcon />}
					// tooltipOpen
					tooltipTitle="Groupe A Blabla"
					onClick={() => console.log("todo")}
				/>
			</SpeedDial>

			<Fab
				color="primary"
				aria-label="add"
				sx={{ position: "fixed", bottom: 16, right: 78 }}
				// tooltipTitle="Partager la comparaison actuelle"
				// tooltipOpen
				onClick={() => shareGroupsUrl(groups)}
			>
				<ShareIcon />
			</Fab>

			<ReactTooltip multiline effect="solid" />
		</QueryClientProvider>
	);
}

export default App;
