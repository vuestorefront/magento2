import gql from 'graphql-tag';
import productFragment from '../../fragments/productFragment';

export default gql`
  query upsellProducts(
    $search: String = ""
    $filter: ProductAttributeFilterInput
    $pageSize: Int = 10
    $currentPage: Int = 1
    $sort: ProductAttributeSortInput
  ) {
    products(
      search: $search
      filter: $filter
      sort: $sort
      pageSize: $pageSize
      currentPage: $currentPage
    ){
      items {
        upsell_products {
          ${productFragment}
        }
        uid
      }
    }
    cacheTags @client
  }
`;
