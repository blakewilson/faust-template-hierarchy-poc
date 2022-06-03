import { ApolloClient, gql, NormalizedCacheObject } from "@apollo/client";
import { GetServerSidePropsContext, GetStaticPropsContext } from "next";
import { SEED_QUERY } from "./queries/seedQuery";
import { getTemplate } from "./components/WordPressNode";
import { addApolloState } from "./apolloClient";

function isSSR(
  ctx: GetServerSidePropsContext | GetStaticPropsContext
): ctx is GetServerSidePropsContext {
  return (ctx as GetServerSidePropsContext).req !== undefined;
}

export async function getWordPressTemplate(options: {
  client: ApolloClient<NormalizedCacheObject>;
  templates: {
    [key: string]: { query?: any; variables?: any; Component: any };
  };
  ctx: GetStaticPropsContext | GetServerSidePropsContext;
}) {
  const { client, templates, ctx } = options;
  let resolvedUrl = null;

  if (!isSSR(ctx)) {
    const wordPressNodeParams = ctx.params?.wordpressNode;
    if (wordPressNodeParams && Array.isArray(wordPressNodeParams)) {
      resolvedUrl = `/${wordPressNodeParams.join("/")}`;
    }
  } else {
    resolvedUrl = ctx.req.url;
  }

  if (!resolvedUrl) {
    return {
      notFound: true,
    };
  }

  console.log("resolvedUrl: ", resolvedUrl);

  console.log("seed query:", SEED_QUERY);

  const root = await client.query({
    query: SEED_QUERY,
    variables: { uri: resolvedUrl },
  });

  console.log("root: ", root);

  const node = root.data?.node;

  console.log("testing node", node);

  if (!node) {
    return {
      notFound: true,
    };
  }

  const template = getTemplate(node, templates);

  if (!template) {
    return {
      notFound: true,
    };
  }

  if (template.query) {
    await client.query({
      query: template.query,
      variables: template?.variables ? template.variables(node) : undefined,
    });
  }

  return addApolloState(client, {
    props: {
      __seedQuery: node,
    },
  });
}
