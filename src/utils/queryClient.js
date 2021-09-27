import { QueryClient } from "react-query";

const queryClient = new QueryClient();

queryClient.setDefaultOptions({
  queries: {
    cacheTime: 1000 * 60 * 10, // Keep informations in cache for ten minutes
  },
});

export default queryClient;
