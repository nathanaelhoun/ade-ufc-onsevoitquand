import { PropTypes } from "prop-types";
import React from "react";
import { useQuery } from "react-query";

import "./ShowOneSchedule.scss";
import { makeGetEdt } from "../../utils/ufc-edt";
import { regroupByDay } from "../../utils/ufc-edt-manipulation";
import Error from "../miscellaneous/Error";
import Loading from "../miscellaneous/Loading";

function groupByHours(dayByGroups) {
	const byHours = {};

	Object.keys(dayByGroups).forEach((groupID) => {
		const activities = dayByGroups[groupID];

		if (!activities) return;

		activities.forEach((activity) => {
			if (!byHours[activity.when]) {
				byHours[activity.when] = [];
			}

			byHours[activity.when].push(activity);
		});
	});

	return byHours;
}

const ShowOneSchedule = ({ groups, config }) => {
	const groupsIDs = Object.keys(groups);

	const response = useQuery(
		["schedule-one", groupsIDs.join("-"), config.nbWeeks],
		makeGetEdt(groupsIDs, config.nbWeeks * 7),
		{
			refetchOnMount: false,
		}
	);

	if (response.isLoading) return <Loading />;
	if (response.error) return <Error msg={response.error} />;

	const byDays = regroupByDay(groups, [response.data]);

	if (!byDays || Object.keys(byDays).length === 0) {
		return <p style={{ textAlign: "center" }}>Aucun cours n'a été trouvé pour cette période.</p>;
	}

	return (
		<div className="show-one-schedule">
			{Object.keys(byDays).map((day) => {
				const byHours = groupByHours(byDays[day]);

				return (
					<div className="one-day" key={`day-${day}`}>
						<h3>{day}</h3>
						{Object.keys(byHours).map((time) => {
							const activities = byHours[time];

							return activities.map((activity, index) => (
								<div
									key={`day-${day}-activity-${index}`}
									data-tip={`${activity.what} ${activity.where}`}
									style={{ backgroundColor: activity.hexColor }}
								>
									<span className="when">{activity.when}</span> - {activity.what} ({activity.where})
								</div>
							));
						})}
					</div>
				);
			})}
		</div>
	);
};

ShowOneSchedule.propTypes = {
	groups: PropTypes.object,
	config: PropTypes.shape({
		nbWeeks: PropTypes.number,
		showOneSchedule: PropTypes.bool,
	}),
};

export default ShowOneSchedule;
