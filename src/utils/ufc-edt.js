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
			.filter((line) => /\S/.test(line))
			.reduce((acc, dayData) => {
				const byLine = dayData.split("\n");
				const date = byLine[0];
				const coursDuJour = byLine
					.slice(1)
					.filter((line) => /\S/.test(line))
					.map((line) => line.substring(line.indexOf(";") + 1)) // remove the color
					.map((line) => line.split(":")).map((el) => {console.log(el); return el});

				acc[date] = coursDuJour;

				return acc;
			}, {});

		return byDay;
	};
}
