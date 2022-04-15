import ShareIcon from "@mui/icons-material/Share";
import CssBaseline from "@mui/material/CssBaseline";
import Fab from "@mui/material/Fab";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { React, useState, useMemo } from "react";
import { QueryClientProvider } from "react-query";
import ReactTooltip from "react-tooltip";
import Button from "@mui/material/Button";
import GroupAddIcon from "@mui/icons-material/GroupAdd";

import "./App.scss";
import HeaderBar from "./components/miscellaneous/HeaderBar";
import CompareSchedule from "./components/Schedule/CompareSchedule";
import SettingsDialog from "./components/Setttings/SettingsDialog";
import LoadURLConfig from "./components/Share/LoadURLConfig";
import { shareGroupsUrl } from "./components/Share/share";
import queryClient from "./utils/queryClient";
import { useLocalStorage } from "./utils/useLocalStorage";

function App() {
	const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

	const [config, setConfig] = useLocalStorage("config", { nbWeeks: 2 });
	const [groups, setGroups] = useLocalStorage("saved-groups-v2", {});

	const [isSettingsModalOpened, setIsSettingsModalOpened] = useState(false);

	const theme = useMemo(
		() =>
			createTheme({
				palette: {
					mode: prefersDarkMode ? "dark" : "light",
				},
			}),
		[prefersDarkMode]
	);

	const loadGroups = window.location.search !== "";

	const content =
		!groups || Object.keys(groups).length === 0 ? (
			<div style={{ textAlign: "center", margin: "3em 1em" }}>
				<p>Commencez par ajouter un groupe dans les paramètres.</p>
				<Button onClick={() => setIsSettingsModalOpened(true)} endIcon={<GroupAddIcon />}>
					Ajouter un groupe
				</Button>
			</div>
		) : (
			<CompareSchedule groups={groups} config={config} />
		);

	if (loadGroups) {
		return <LoadURLConfig originalConfig={config} originalGroups={groups} />;
	}

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline enableColorScheme />
			<QueryClientProvider client={queryClient}>
				<HeaderBar openSettings={() => setIsSettingsModalOpened(true)} />

				<main>{content}</main>

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
		</ThemeProvider>
	);
}

export default App;
