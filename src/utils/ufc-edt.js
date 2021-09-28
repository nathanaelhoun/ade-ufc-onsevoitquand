import axios from "axios";

export function makeGetEdt(groupId, days = 14) {
  return async () => {
    const mode = 3;
    const color = 1;
    const sports = "0";

    const rawData = (
      await axios.get(
        `/api/v1/wmplanif.jsp?id=${groupId}&jours=${days}&mode=${mode}&color=${color}&sports=${sports}`
      )
    ).data;

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
