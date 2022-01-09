import GroupAddIcon from "@mui/icons-material/GroupAdd";
import GroupRemoveIcon from "@mui/icons-material/GroupRemove";
import GroupsIcon from "@mui/icons-material/Groups";
import ShareIcon from "@mui/icons-material/Share";
import Backdrop from "@mui/material/Backdrop";
import { green, red } from "@mui/material/colors";
import Fab from "@mui/material/Fab";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import { makeStyles, createStyles } from "@mui/styles";
import { React, useState } from "react";
import { QueryClientProvider } from "react-query";
import ReactTooltip from "react-tooltip";

import "./App.scss";
import GroupSelectorModal from "./components/GroupeSelector/GroupSelectorModal";
import ControlledInput from "./components/miscellaneous/ControlledInput";
import Title from "./components/miscellaneous/Title";
import CompareSchedule from "./components/Schedule/CompareSchedule";
import LoadURLConfig from "./components/Share/LoadURLConfig";
import { shareGroupsUrl } from "./components/Share/share";
import queryClient from "./utils/queryClient";
import { useLocalStorage } from "./utils/useLocalStorage";

const useStyles = makeStyles((theme) =>
	createStyles({
		StaticTooltipLabel: {
			whiteSpace: "nowrap",
			maxWidth: "none",
		},
	})
);

function App() {
	const styles = useStyles();

	const [config, setConfig] = useLocalStorage("config", { nbWeeks: 2 });
	const [groups, setGroups] = useLocalStorage("saved-groups-v2", {});

	const [isAddGroupModalOpened, setIsAddGroupModalOpened] = useState(false);
	const [isMenuOpened, setIsMenuOpened] = useState(false);

	const loadGroups = window.location.search !== "";

	if (loadGroups) {
		return <LoadURLConfig originalConfig={config} originalGroups={groups} />;
	}

	return (
		<QueryClientProvider client={queryClient}>
			<Title />

			<div className="buttons">
				<div id="config">
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

			<main>
				<CompareSchedule groups={groups} config={config} />
			</main>

			<GroupSelectorModal
				isOpen={isAddGroupModalOpened}
				handleClose={() => setIsAddGroupModalOpened(false)}
				initialID={0}
				addGroup={(group) => {
					console.info("Adding group", group);
					setGroups((oldList) => ({ ...oldList, [group.id]: group.path }));
				}}
			/>

			<Backdrop open={isMenuOpened} />

			<SpeedDial
				ariaLabel="Actions supplémentaires"
				sx={{ position: "fixed", bottom: 16, right: 16 }}
				icon={<GroupsIcon />}
				onOpen={() => setIsMenuOpened(true)}
				onClose={() => isAddGroupModalOpened || setIsMenuOpened(false)}
				open={isMenuOpened}
			>
				<SpeedDialAction
					icon={<GroupAddIcon sx={{ color: green[500] }} />}
					tooltipTitle="Ajouter un groupe"
					tooltipOpen
					classes={{ staticTooltipLabel: styles.StaticTooltipLabel }}
					onClick={() => setIsAddGroupModalOpened(true)}
				/>

				{Object.keys(groups).map((groupID) => (
					<SpeedDialAction
						key={groupID}
						icon={<GroupRemoveIcon sx={{ color: red[600] }} />}
						tooltipTitle={groups[groupID].join(" > ")}
						tooltipOpen
						classes={{ staticTooltipLabel: styles.StaticTooltipLabel }}
						onClick={() => {
							setGroups((oldGroups) => {
								delete oldGroups[groupID];
								return { ...oldGroups };
							});
						}}
					/>
				))}
			</SpeedDial>

			<Fab
				color="primary"
				sx={{ position: "fixed", bottom: 16, right: 80 }}
				onClick={() => shareGroupsUrl(groups)}
			>
				<ShareIcon />
			</Fab>

			<ReactTooltip multiline effect="solid" />
		</QueryClientProvider>
	);
}

export default App;
