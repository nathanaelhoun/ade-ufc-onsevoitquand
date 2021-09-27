import { useQueries } from "react-query";
import "./CompareEdt.scss";

import { makeGetEdt } from "../../utils/ufc-edt";
import Loading from "../miscellaneous/Loading";
import Error from "../miscellaneous/Error";
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

const CompareEdt = ({ groupIds }) => {
  const all = useQueries(
    groupIds.map((id) => ({
      queryKey: ["schedule", id],
      queryFn: makeGetEdt(id),
    }))
  );

  if (all.some((e) => e.isLoading)) return <Loading />;
  if (all.some((e) => e.error)) return <Error />;

  const allData = all.map((edt) => edt.data);
  const allDays = [...new Set(allData.flatMap(Object.keys))].sort(compareDates);

  const byDays = allDays.reduce((acc, day) => {
    return {
      ...acc,
      [day]: allData.reduce(
        (acc, groupSchedule, index) => ({
          ...acc,
          [groupIds[index]]: groupSchedule[day],
        }),
        {}
      ),
    };
  }, {});

	return (
    <div className="compare-edt">
      {Object.keys(byDays).map((day) => (
        <ShowDay key={`day-${day}`} day={day} dayInformations={byDays[day]} />
      ))}
    </div>
  );
};

const ShowDay = ({ day, dayInformations }) => {
  return (
    <div className="day-schedule-comparison">
      <h3>{day}</h3>

      <ShowEdtDay dayInformations={dayInformations} />
    </div>
  );
};

export default CompareEdt;
