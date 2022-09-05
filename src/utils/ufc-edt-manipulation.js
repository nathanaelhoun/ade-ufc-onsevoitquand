/**
 *
 * @param {Object} groups
 * @param {*} data
 * @returns {Object}
 */
export function regroupByDay(groups, data) {
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

export function compareDates(date1, date2) {
	const frenchMonths = [
		"Septembre",
		"Octobre",
		"Novembre",
		"Décembre",
		"Janvier",
		"Février",
		"Mars",
		"Avril",
		"Mai",
		"Juin",
		"Juillet",
		"Août",
	];

	const [, day1, month1] = date1.split(" ");
	const [, day2, month2] = date2.split(" ");

	const monthsDiff =
		frenchMonths.findIndex((el) => el === month1) - frenchMonths.findIndex((el) => el === month2);

	if (monthsDiff !== 0) {
		return monthsDiff;
	}

	return day1 - day2;
}
