import gql from 'graphql-tag';
import BaseProductData from '../../fragments/baseProductFragment';

export default gql`
  ${BaseProductData}
  
query relatedProduct(
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
  ) {
    items {
      related_products {
       ...BaseProductData
      }
      uid
    }
  }
}`;
