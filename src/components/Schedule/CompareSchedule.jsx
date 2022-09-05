import { PropTypes } from "prop-types";
import React from "react";
import { useQueries } from "react-query";

import "./CompareSchedule.scss";
import { makeGetEdt } from "../../utils/ufc-edt";
import { regroupByDay } from "../../utils/ufc-edt-manipulation";
import variables from "../../variables.module.scss";
import Error from "../miscellaneous/Error";
import Loading from "../miscellaneous/Loading";

import ShowScheduleDay from "./ShowScheduleDay";

const CompareSchedule = ({ groups, config }) => {
	const allResponses = useQueries(
		Object.keys(groups).map((groupID) => ({
			queryKey: ["schedule", groupID, config.nbWeeks],
			queryFn: makeGetEdt([groupID], config.nbWeeks * 7),
			refetchOnMount: false,
		}))
	);

	if (allResponses.some((r) => r.isLoading)) return <Loading />;
	if (allResponses.some((r) => r.error))
		return (
			<Error
				msg={allResponses.reduce((acc, r) => acc + (r.isError ? "<br/>" + r.error : ""), "")}
			/>
		);

	const byDays = regroupByDay(
		groups,
		allResponses.map((response) => response.data)
	);

	if (!byDays || Object.keys(byDays).length === 0) {
		return <p style={{ textAlign: "center" }}>Aucun cours n'a été trouvé pour cette période.</p>;
	}

	const numCols = Math.max(
		0,
		parseInt(variables.maxColumns) - Math.floor(Object.keys(groups).length / 2)
	);

	return (
		<div className={`compare-schedule columns-${numCols}`} style={{ "--numCols": numCols }}>
			{Object.keys(byDays).map((day) => (
				<div className="day-schedule-comparison" key={`day-${day}`}>
					<hr />
					<h3>{day}</h3>
					<ShowScheduleDay dayInformations={byDays[day]} groups={groups} />
				</div>
			))}
		</div>
	);
};

CompareSchedule.propTypes = {
	dayInformations: PropTypes.object,
	groups: PropTypes.object,
	day: PropTypes.string,
	config: PropTypes.shape({
		nbWeeks: PropTypes.number,
		showOneSchedule: PropTypes.bool,
	}),
};

export default CompareSchedule;
