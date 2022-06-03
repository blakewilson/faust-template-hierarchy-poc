import {
  ApolloClient,
  ApolloProvider,
  NormalizedCacheObject,
} from "@apollo/client";
import { useApollo } from "new-faust/apolloClient";
import type { AppProps } from "next/app";

export default function FaustProvider(props: {
  client: ApolloClient<NormalizedCacheObject>;
  children: React.ReactNode;
  pageProps: AppProps["pageProps"];
}) {
  const { client, pageProps } = props;
  const apolloClient = useApollo(client, pageProps);

  return (
    <ApolloProvider client={apolloClient}>{props.children}</ApolloProvider>
  );
}
