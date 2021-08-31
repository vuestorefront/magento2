import gql from 'graphql-tag';
import productDetailsFragment from '../../fragments/productDetailsFragment';

export default gql`
  query productDetails(
    $search: String = "",
    $filter: ProductAttributeFilterInput,
    $pageSize: Int = 10,
    $currentPage: Int = 1,
    $sort: ProductAttributeSortInput
    $configurations: [ID!]
  ) {
    products(search: $search, filter: $filter, sort: $sort, pageSize: $pageSize, currentPage: $currentPage) {
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
