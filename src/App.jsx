import "./App.scss";
import { QueryClientProvider } from "react-query";
import queryClient from "./utils/queryClient";
import CompareEdt from "./components/Edt/CompareEdt";

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<CompareEdt groupIds={[15914, 11603]} />
		</QueryClientProvider>
	);
}

export default App;
