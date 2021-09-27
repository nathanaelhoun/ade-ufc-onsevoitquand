import { useMemo } from "react";
import "./ShowEdtDay.scss";

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
	const schedules = {};
	Object.keys(dayInformations).forEach((groupId) => {
		const rawSchedule = new Array(times.length).fill(null);

		if (dayInformations[groupId]) {
			dayInformations[groupId].forEach((activity) => {
				const indexStart = times.findIndex((el) => el === activity.startTime);
				const indexEnd = times.findIndex((el) => el === activity.endTime);

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

	return schedules;
}

const ShowEdtDay = ({ dayInformations }) => {
	const firstTimeIndex = 0; // TODO compute this
	const lastTimeIndex = times.length - 1; // TODO compute this

	const computedDaySchedule = useMemo(() => {
		return computeDaySchedules(dayInformations);
	}, [dayInformations]);

	return (
		<table className="schedule">
			<tr>
				<th className="title-time"></th>
				{Object.keys(dayInformations).map((groupId) => (
					<th className="title-group">{groupId}</th>
				))}
			</tr>

			{times.slice(firstTimeIndex, lastTimeIndex).map((time, index) => (
				<tr>
					<th className="title-time">{time}</th>

					{Object.keys(dayInformations).map((groupId) => {
						const activity = computedDaySchedule[groupId][index];

						if (activity === false) {
							return <></>;
						}

						if (activity === null) {
							return (
								<td key={times[index]} className="activity-item available"></td>
							);
						}

						return (
							<td
								key={times[index]}
								className="activity-item not-available"
								title={`${activity.what} ${activity.where}`}
								style={{
									backgroundColor: activity.hexColor,
								}}
								rowSpan={activity.duration ?? 1}
							>
								{activity.what} <span style={{whiteSpace:"nowrap"}}>({activity.where})</span>
							</td>
						);
					})}
				</tr>
			))}
		</table>
	);
};

// const ShowEdtDayHeader = () => {
// 	return (
// 		<ul>
// 			{times.map((time) => {
// 				return <li key={time}>{time}</li>;
// 			})}
// 		</ul>
// 	);
// };

// const ShowEdtDayContent = () => {
// 	console.debug("update " + dayInformations.length);

// 	const computedDaySchedule = useMemo(() => {
// 		console.debug("recompute");
// 		const schedule = new Array(times.length).fill(false);

// 		dayInformations.forEach((activity) => {
// 			const indexStart = times.findIndex((el) => el === activity.startTime);
// 			const indexEnd = times.findIndex((el) => el === activity.endTime);

// 			activity.length = indexEnd - indexStart;

// 			schedule[indexStart] = activity;
// 		});

// 		return schedule;
// 	}, [dayInformations]);

// 	return (
// 		<>
// 			{computedDaySchedule.map((activity, index) => {
// 				if (!activity) {
// 					return (
// 						<li key={times[index]} className="activity-item available"></li>
// 					);
// 				}

// 				return (
// 					<li
// 						key={times[index]}
// 						className="activity-item not-available"
// 						title={`${activity.what} ${activity.where}`}
// 						style={{
// 							backgroundColor: activity.hexColor,
// 						}}
// 						rowSpan={activity.indexStart ?? 1}
// 					>
// 						{activity.what} ({activity.when} )
// 					</li>
// 				);
// 			})}
// 		</>
// 	);
// };

export default ShowEdtDay;
