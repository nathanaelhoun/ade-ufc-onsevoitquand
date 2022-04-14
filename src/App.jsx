import ShareIcon from "@mui/icons-material/Share";
import Fab from "@mui/material/Fab";
import { React, useState } from "react";
import { QueryClientProvider } from "react-query";
import ReactTooltip from "react-tooltip";

import "./App.scss";
import HeaderBar from "./components/miscellaneous/HeaderBar";
import CompareSchedule from "./components/Schedule/CompareSchedule";
import SettingsDialog from "./components/Setttings/SettingsDialog";
import LoadURLConfig from "./components/Share/LoadURLConfig";
import { shareGroupsUrl } from "./components/Share/share";
import queryClient from "./utils/queryClient";
import { useLocalStorage } from "./utils/useLocalStorage";

function App() {
	const [config, setConfig] = useLocalStorage("config", { nbWeeks: 2 });
	const [groups, setGroups] = useLocalStorage("saved-groups-v2", {});

	const [isSettingsModalOpened, setIsSettingsModalOpened] = useState(true);

	const loadGroups = window.location.search !== "";

	if (loadGroups) {
		return <LoadURLConfig originalConfig={config} originalGroups={groups} />;
	}

	return (
		<QueryClientProvider client={queryClient}>
			<HeaderBar openSettings={() => setIsSettingsModalOpened(true)} />

			<main>
				<CompareSchedule groups={groups} config={config} />
			</main>

			<SettingsDialog
				open={isSettingsModalOpened}
				onClose={() => setIsSettingsModalOpened(false)}
				config={config}
				groups={groups}
				setConfig={setConfig}
				setGroups={setGroups}
			/>

			<Fab
				color="primary"
				sx={{ position: "fixed", bottom: 16, right: 16 }}
				onClick={() => shareGroupsUrl(groups)}
			>
				<ShareIcon />
			</Fab>

			<ReactTooltip multiline effect="solid" />
		</QueryClientProvider>
	);
}

export default App;
