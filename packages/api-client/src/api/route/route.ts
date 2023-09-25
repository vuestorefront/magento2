export default `
  query route($url: String!) {
    route(url: $url) {
      type
       ... on ProductInterface {
        sku
      }
      ... on CategoryTree {
        uid
      }
      ... on CmsPage {
        identifier
      }
      ... on CategoryInterface {
        uid
      }
    }
  }
`;
