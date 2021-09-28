import { PropTypes } from "prop-types";
import React from "react";
import { useQueries } from "react-query";

import "./CompareSchedule.scss";
import { compareDates, makeGetEdt } from "../../utils/ufc-edt";
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

const CompareSchedule = ({ groups }) => {
  const allResponses = useQueries(
    Object.keys(groups).map((groupID) => ({
      queryKey: ["schedule", groupID],
      queryFn: makeGetEdt(groupID),
    }))
  );

  if (allResponses.some((e) => e.isLoading)) return <Loading />;
  if (allResponses.some((e) => e.error)) return <Error />;

  const byDays = regroupByDay(
    groups,
    allResponses.map((response) => response.data)
  );

  const numCols = Math.floor(Math.max(0, 7 - (Object.keys(groups).length / 2)));

  return (
    <div className="compare-schedule" style={{ "--numCols": numCols }}>
      {Object.keys(byDays).map((day) => (
        <div className="day-schedule-comparison" key={`day-${day}`}>
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
};

export default CompareSchedule;
