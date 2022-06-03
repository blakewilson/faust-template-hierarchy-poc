import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import possibleTypes from "possibleTypes.json";

let client = new ApolloClient({
  ssrMode: typeof window === "undefined",
  connectToDevTools: typeof window !== "undefined",
  link: new HttpLink({
    uri: "http://headless.local/graphql",
    fetchOptions: {
      method: "POST",
    },
  }),
  cache: new InMemoryCache({
    possibleTypes,
    typePolicies: {
      RootQuery: {
        queryType: true,
      },
      RootMutation: {
        mutationType: true,
      },
    },
  }),
});

export default client;
