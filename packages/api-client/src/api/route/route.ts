import gql from 'graphql-tag';

/** GraphQL Query that fetches the resolver for received URL. */
export default gql`
  query route($url: String!) {
    route(url: $url) {
      type
      ... on SimpleProduct {
        sku
      }
      ... on GroupedProduct {
        sku
      }
      ... on VirtualProduct {
        sku
      }
      ... on DownloadableProduct {
        sku
      }
      ... on ConfigurableProduct {
        sku
      }
      ... on BundleProduct {
        sku
      }
      ... on CategoryTree {
        uid
      }
      ... on CmsPage {
        identifier
      }
    }
  }
`;
