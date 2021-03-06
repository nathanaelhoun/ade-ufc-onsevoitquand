import { PropTypes } from "prop-types";
import React, { useEffect, useMemo } from "react";
import ReactTooltip from "react-tooltip";

import "./ShowScheduleDay.scss";

const times = [
	"8h",
	"8h30",
	"9h",
	"9h30",
	"10h",
	"10h30",
	"11h",
	"11h30",
	"12h",
	"12h30",
	"13h",
	"13h30",
	"14h",
	"14h30",
	"15h",
	"15h30",
	"16h",
	"16h30",
	"17h",
	"17h30",
	"18h",
	"18h30",
	"19h",
	"19h30",
];

function computeDaySchedules(dayInformations) {
	let firstTimeIndex = times.length - 1;
	let lastTimeIndex = 0;

	const schedules = {};
	Object.keys(dayInformations).forEach((groupId) => {
		const rawSchedule = new Array(times.length).fill(null);

		if (dayInformations[groupId]) {
			dayInformations[groupId].forEach((activity) => {
				const indexStart = times.findIndex((el) => el === activity.startTime);
				const indexEnd = times.findIndex((el) => el === activity.endTime);

				if (indexStart < firstTimeIndex) {
					firstTimeIndex = indexStart;
				}

				if (lastTimeIndex < indexEnd) {
					lastTimeIndex = indexEnd;
				}

				activity.duration = indexEnd - indexStart;
				rawSchedule[indexStart] = activity;
			});
		}

		let skipNext = 0;
		const schedule = rawSchedule.reduce((acc, activity) => {
			if (skipNext > 0) {
				skipNext--;
				return [...acc, false];
			}

			if (activity && activity.duration) {
				skipNext = activity.duration - 1;
			}

			return [...acc, activity];
		}, []);

		schedules[groupId] = schedule;
	});

	return [schedules, firstTimeIndex, lastTimeIndex];
}

const ScheduleRow = ({ activities, nbGroups }) => {
	const available =
		activities.filter((a) => a !== false).length === nbGroups &&
		activities.every((a) => a === false || a === null);

	if (available) {
		return activities.map((_, i) => <td key={i} className="activity-item available"></td>);
	}

	const classes = "activity-item " + (available ? "available" : "not-available");

	return (
		<>
			{activities.map((activity, index) => {
				if (activity === false) {
					return null;
				}

				if (activity === null) {
					return <td key={`${times[index]}`} className={classes}></td>;
				}

				return (
					<td
						key={`${times[index]}`}
						className={classes}
						data-tip={`${activity.what} ${activity.where}`}
						style={{
							// backgroundColor: `${activity.hexColor}90`,
							"--rowspan": activity.duration ?? 1,
						}}
						rowSpan={activity.duration ?? 1}
					>
						<div className="container">
							<div>
								{activity.what} ({activity.where})
							</div>
						</div>
					</td>
				);
			})}
		</>
	);
};

ScheduleRow.propTypes = {
	activities: PropTypes.array,
	nbGroups: PropTypes.number,
};

const ShowScheduleDay = ({ dayInformations, groups }) => {
	const [computedDaySchedule, firstTimeIndex, lastTimeIndex] = useMemo(() => {
		return computeDaySchedules(dayInformations);
	}, [dayInformations]);

	const groupIDs = Object.keys(dayInformations);

	useEffect(() => {
		ReactTooltip.rebuild();
	});

	return (
		<table className="schedule">
			<tbody>
				<tr className="head-row">
					<th className="title-time"></th>
					{groupIDs.map((groupID) => (
						<th
							key={`group-id-${groupID}`}
							className="title-group"
							data-tip={groups[groupID].join("<br/>")}
						>
							<div>
								<div>{groups[groupID].slice(-2).join(" > ")}</div>
							</div>
						</th>
					))}
				</tr>

				{times.map((time, index) => (
					<tr
						height="22px"
						key={`row-${time}`}
						className={firstTimeIndex <= index && index < lastTimeIndex ? "" : "hide-gain-space"}
					>
						<th className="title-time">{time}</th>

						<ScheduleRow
							activities={groupIDs.map((groupID) => computedDaySchedule[groupID][index])}
							nbGroups={groupIDs.length}
						/>
					</tr>
				))}
			</tbody>
		</table>
	);
};

ShowScheduleDay.propTypes = {
	dayInformations: PropTypes.object,
	groups: PropTypes.object,
};

export default ShowScheduleDay;
