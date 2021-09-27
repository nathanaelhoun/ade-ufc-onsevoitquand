import { PropTypes } from "prop-types";
import React from "react";
import { useQueries } from "react-query";

import "./CompareEdt.scss";
import { makeGetEdt } from "../../utils/ufc-edt";
import Error from "../miscellaneous/Error";

import Loading from "../miscellaneous/Loading";

import ShowEdtDay from "./ShowEdtDay";

function compareDates(date1, date2) {
  const frenchMonthes = [
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

  if (
    frenchMonthes.findIndex((el) => el === month1) !==
    frenchMonthes.findIndex((el) => el === month2)
  ) {
    return (
      frenchMonthes.findIndex((el) => el === month1) -
      frenchMonthes.findIndex((el) => el === month2)
    );
  }

  return day1 - day2;
}

const CompareEdt = ({ groups }) => {
  const allResponses = useQueries(
    Object.keys(groups).map((groupID) => ({
      queryKey: ["schedule", groupID],
      queryFn: makeGetEdt(groupID),
    }))
  );

  if (allResponses.some((e) => e.isLoading)) return <Loading />;
  if (allResponses.some((e) => e.error)) return <Error />;

  const allData = allResponses.map((response) => response.data);
  const allDays = [...new Set(allData.flatMap(Object.keys))].sort(compareDates);
  const byDays = allDays.reduce((acc, day) => {
    return {
      ...acc,
      [day]: allData.reduce(
        (acc, groupSchedule, index) => ({
          ...acc,
          [Object.keys(groups)[index]]: groupSchedule[day],
        }),
        {}
      ),
    };
  }, {});

  return (
    <div className="compare-edt">
      {Object.keys(byDays).map((day) => (
        <ShowDay key={`day-${day}`} day={day} dayInformations={byDays[day]} groups={groups} />
      ))}
    </div>
  );
};

const ShowDay = ({ day, dayInformations, groups }) => {
  return (
    <div className="day-schedule-comparison">
      <h3>{day}</h3>

      <ShowEdtDay dayInformations={dayInformations} groups={groups} />
    </div>
  );
};

CompareEdt.propTypes = {
  dayInformations: PropTypes.object,
  groups: PropTypes.object,
  day: PropTypes.string,
};

ShowDay.propTypes = {
  dayInformations: PropTypes.object,
  groups: PropTypes.object,
  day: PropTypes.string,
};

export default CompareEdt;
