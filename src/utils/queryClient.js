import { QueryClient } from "react-query";

const queryClient = new QueryClient();

queryClient.setDefaultOptions({
  queries: {
    cacheTime: 1000 * 60 * 10, // Keep informations in cache for ten minutes
  },
});

// Here we define the defaults functions for general queries

// queryClient.setQueryDefaults(["user", id], {
//   queryFn: makeGetEdt(id),
//   staleTime: Infinity,
//   placeholderData: {
//     avatar: {
//       eyes: 0,
//       hands: 0,
//       hat: 0,
//       mouth: 0,
//       colorBody: "#000000", // black
//       colorBG: "#D3D3D3", // lightgray
//     },
//     defeats: "-",
//     pseudo: "Pseudonyme",
//     victories: "-",
//   },
// });

export default queryClient;
