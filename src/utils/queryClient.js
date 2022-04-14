import { QueryClient } from "react-query";

const queryClient = new QueryClient();

queryClient.setDefaultOptions({
	queries: {
		cacheTime: 1000 * 60 * 60, // Keep informations in cache for 1 hour
		staleTime: 1000 * 60 * 30, // Only refetch after 30 minutes
	},
});

export default queryClient;
