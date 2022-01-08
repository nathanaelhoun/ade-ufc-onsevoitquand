import { PropTypes } from "prop-types";
import React from "react";
import { useQueries } from "react-query";

import "./CompareSchedule.scss";

import { compareDates, makeGetEdt } from "../../utils/ufc-edt";
import variables from "../../variables.module.scss";
import Error from "../miscellaneous/Error";
import Loading from "../miscellaneous/Loading";

import ShowScheduleDay from "./ShowScheduleDay";

function regroupByDay(groups, data) {
	const days = [...new Set(data.flatMap(Object.keys))].sort(compareDates);

	return days.reduce((acc, day) => {
		return {
			...acc,
			[day]: data.reduce(
				(acc, groupSchedule, index) => ({
					...acc,
					[Object.keys(groups)[index]]: groupSchedule[day],
				}),
				{}
			),
		};
	}, {});
}

const CompareSchedule = ({ groups, config }) => {
	const allResponses = useQueries(
		Object.keys(groups).map((groupID) => ({
			queryKey: ["schedule", groupID, config.nbWeeks],
			queryFn: makeGetEdt(groupID, config.nbWeeks * 7),
			refetchOnMount: false,
		}))
	);

	if (allResponses.some((e) => e.isLoading)) return <Loading />;
	if (allResponses.some((e) => e.error)) return <Error />;

	const byDays = regroupByDay(
		groups,
		allResponses.map((response) => response.data)
	);

	if (!groups || Object.keys(groups).length === 0) {
		return <p style={{ textAlign: "center" }}>Commencez par ajouter un groupe en bas à droite.</p>;
	}

	if (!byDays || Object.keys(byDays).length === 0) {
		return <p style={{ textAlign: "center" }}>Aucun cours n'a été trouvé pour cette période.</p>;
	}

	const numCols = Math.max(
		0,
		parseInt(variables.maxColumns) - Math.floor(Object.keys(groups).length / 2)
	);

	return (
		<div
			className={`compare-schedule columns-${numCols} ${config.isCompact ? "compact" : ""}`}
			style={{ "--numCols": numCols }}
		>
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
		isCompact: PropTypes.bool,
		nbWeeks: PropTypes.number,
	}),
};

export default CompareSchedule;
