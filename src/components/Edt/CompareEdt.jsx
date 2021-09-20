import { useQueries } from "react-query";
import "./CompareEdt.scss";

import { makeGetEdt } from "../../utils/ufc-edt";
import Loading from "../miscellaneous/Loading";
import Error from "../miscellaneous/Error";

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
			queryKey: ["edt", id],
			queryFn: makeGetEdt(id),
		}))
	);

	if (all.some((e) => e.isLoading)) return <Loading />;
	if (all.some((e) => e.error)) return <Error />;

	const allData = all.map((edt) => edt.data);
	const allDays = [...new Set(allData.flatMap(Object.keys))].sort(compareDates);

	return (
		<div className="compare-edt">
			<table>
				<thead>
					<tr>
						<th>Jour</th>
						{groupIds.map((group) => (
							<th key={`title-${group}`}>{group}</th>
						))}
					</tr>
				</thead>

				<tbody>
					{allDays.map((day) => (
						<tr key={`day-${day}`}>
							<ShowDay
								day={day}
								groupIds={groupIds}
								dayInformations={allData.map((groupEdt) => groupEdt[day])}
							/>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

const ShowDay = ({ groupIds, day, dayInformations }) => {
	return (
		<>
			<td>{day}</td>
			{dayInformations.map((edt, index) => (
				<td key={`${day}-group-${groupIds[index]}`}>
					<ul>
						{edt &&
							edt.map((line) => (
								<li key={`line-${index}-${line}`}>
									{line[0]} {line[1].split(";")[0]}
								</li>
							))}
					</ul>
				</td>
			))}
		</>
	);
};

export default CompareEdt;
