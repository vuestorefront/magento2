import gql from 'graphql-tag';

/** GraphQL Query that fetches the resolver for received URL. */
export default gql`
  query route($url: String!) {
    route(url: $url) {
      __typename
      ... on SimpleProduct {
        sku
        id
        uid
      }
      ... on GroupedProduct {
        sku
        id
        uid
      }
      ... on VirtualProduct {
        sku
        id
        uid
      }
      ... on DownloadableProduct {
        sku
        id
        uid
      }
      ... on ConfigurableProduct {
        sku
        id
        uid
      }
      ... on BundleProduct {
        sku
        id
        uid
      }
      ... on CategoryTree {
        id
        uid
      }
      ... on CmsPage {
        identifier
      }
    }
  }
`;
