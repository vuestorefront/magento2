import gql from 'graphql-tag';
import productFragment from '../../fragments/productFragment';

export default gql`
query upsellProducts(
  $search: String = ""
  $filter: ProductAttributeFilterInput
  $pageSize: Int = 20
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
      used_products {
        ${productFragment}
        used_notes
        used_condition
      }
      uid
    }
  }
}`;
