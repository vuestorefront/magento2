import gql from 'graphql-tag';
import ProductData from '../../fragments/productFragment';

export default gql`
  ${ProductData}
  
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
      upsell_products {
        ...ProductData
      }
      uid
    }
  }
}`;
