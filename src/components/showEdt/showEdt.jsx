import { useQuery } from "react-query";
import "./showEdt"
import { makeGetEdt } from "../../utils/ufc-edt";

const ShowEdt = ({ groupId }) => {
	const { data, isLoading } = useQuery(["edt", groupId], {
		queryFn: makeGetEdt(groupId),
		placeholderData: {},
	});

	if (isLoading) {
		return <div>Chargement</div>;
	}

	return (
		<div class="edt-wrapper">
			<h1>EDT {groupId}</h1>
			{Object.entries(data).map((entry) => {
				const [date, coursDuJour] = entry;

				return (
					<div key={date}>
						<span>{date}</span>

						{coursDuJour.map((cours, index) => (
							<pre key={`${date}-${index}`}>{cours}</pre>
						))}
					</div>
				);
			})}
		</div>
	);
};

export default ShowEdt;
