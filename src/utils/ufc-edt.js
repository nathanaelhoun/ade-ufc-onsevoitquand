import axios from "axios";

// To everyone that will one day open this file: I'm really sorry for this code.
// Explore the API and you will understand the processing done here

export function makeGetEdt(groupIDs, days = 14) {
	return async () => {
		const mode = 3;
		const color = 1;
		const sports = "0";

		const rawData = (
			await axios.get(
				`/api/v1/wmplanif.jsp?id=${groupIDs.join(
					","
				)}&jours=${days}&mode=${mode}&color=${color}&sports=${sports}`
			)
		).data;

		if (rawData.includes("Nb maxi de lignes atteint (250)")) {
			throw new Error(
				"Les groupes que vous avez choisis sont trop grands, veuillez choisir de plus petits groupes."
			);
		}

		const byDay = {};
		rawData
			.split("*date*;")
			.filter((line) => /\S/.test(line)) // remove empty lines
			.forEach((dayData) => {
				const byLine = dayData.split("\n");

				const day = byLine[0];
				const dayActivities = byLine
					.slice(1) // remove day
					.filter((line) => /\S/.test(line)) // remove empty lines
					.reduce((acc, line) => {
						const [decimalColor, content, where] = line.split(";");
						const hexColor = "#" + parseInt(decimalColor, 10).toString(16).padStart(6, "0");
						const [when, what] = content.split(":");

						const [startTime, endTime] = when.split("-");

						const newActivity = {
							hexColor,
							when,
							what: what.trim(),
							where: (where ?? "").replace(/^ *\* +/g, ""),
							startTime: startTime.trim(),
							endTime: endTime.trim(),
						};

						return [...acc, newActivity];
					}, []);

				byDay[day] = dayActivities;
			});

		return byDay;
	};
}

export function makeGetSubgroups(groupId) {
	return async () => {
		const rawData = (await axios.get(`/api/v1/wmselect.jsp?id=${groupId}`)).data;

		return rawData
			.split("\n")
			.filter((line) => /\S/.test(line)) // remove empty lines
			.slice(1) // remove outer group
			.reduce((acc, line) => {
				const [, id, name] = line.split(";");

				return [...acc, { id, name }];
			}, []);
	};
}

export function makeGetHierarchyToSubgroup(subGroupId) {
	async function recursiveRequest(current, previous) {
		const rawData = (await axios.get(`/api/v1/wmselect.jsp?id=${current}`)).data.trim();
		const parentMatches = /^1;([0-9]+);\.\.$/m.exec(rawData);

		const groupName = new RegExp(`^1;${previous};(.+?)(?:;.*)?$`, "m").exec(rawData)?.[1] ?? "";

		if (parentMatches === null) {
			// This is root parent
			return [groupName];
		}

		const parentID = parseInt(parentMatches[1]);

		if (groupName === "") {
			// This is first call without previous
			return await recursiveRequest(parentID, current);
		}

		return [...(await recursiveRequest(parentID, current)), groupName];
	}

	return async () => ({ [subGroupId]: await recursiveRequest(subGroupId) });
}
