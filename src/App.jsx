import "./App.scss";
import { QueryClientProvider } from "react-query";
import queryClient from "./utils/queryClient";
import ShowEdt from "./components/showEdt/showEdt";

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<div className="compare-edt">
				<ShowEdt groupId={15914} />
				<ShowEdt groupId={12693} />
			</div>
		</QueryClientProvider>
	);
}

export default App;
