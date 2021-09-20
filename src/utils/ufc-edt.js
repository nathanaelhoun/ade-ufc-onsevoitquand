import axios from "axios";

export function makeGetEdt(groupId) {
	return async () => {
		const days = 61;
		const mode = 3;
		const color = 1;
		const sports = "0";

		const rawData = (
			await axios.get(
				`wmplanif.jsp?id=${groupId}&jours=${days}&mode=${mode}&color=${color}&sports=${sports}`
			)
		).data;

		const byDay = rawData
			.split("*date*;")
			.filter((line) => /\S/.test(line)) // remove empty lines
			.reduce((acc, dayData) => {
				const byLine = dayData.split("\n");
				const day = byLine[0];
				const dayActivities = byLine
					.slice(1)
					.filter((line) => /\S/.test(line))
					.map((line) => line.substring(line.indexOf(";") + 1)) // remove the color
					.map((line) => line.split(":"));

				acc[day] = dayActivities;

				return acc;
			}, {});

		return byDay;
	};
}
