import { gql } from "@apollo/client";

export const SEED_QUERY = gql`
  query GetNodeByUri($uri: String!) {
    node: nodeByUri(uri: $uri) {
      ...NodeByUri
    }
  }

  fragment NodeByUri on UniformResourceIdentifiable {
    __typename
    uri
    id
    ...DatabaseIdentifier
    ...ContentType
    ...User
    ...TermNode
    ...ContentNode
    ...MediaItem
  }

  fragment DatabaseIdentifier on DatabaseIdentifier {
    databaseId
  }

  fragment MediaItem on MediaItem {
    id
    mimeType
  }

  fragment ContentType on ContentType {
    name
    isFrontPage
    isPostsPage
  }

  fragment TermNode on TermNode {
    isTermNode
    slug
    taxonomyName
  }

  fragment ContentNode on ContentNode {
    isContentNode
    slug
    contentType {
      node {
        name
      }
    }
    template {
      templateName
    }
  }

  fragment User on User {
    name
    userId
    databaseId
  }
`;
