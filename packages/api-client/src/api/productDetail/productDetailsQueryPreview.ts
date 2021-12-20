import gql from 'graphql-tag';
import productDetailsFragment from '../../fragments/productDetailsFragment';

export default gql`
  query productDetailsPreview(
    $filter: ProductAttributeFilterInput
  ) {
    products(filter: $filter) {
      items {
        ${productDetailsFragment}
      }
      aggregations {
        attribute_code
        label
        options {
          label
          value
        }
      }
    }
    cacheTags @client
  }
`;
