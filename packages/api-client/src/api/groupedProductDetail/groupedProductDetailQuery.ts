import gql from 'graphql-tag';
import GroupedProductOptionsData from '../../fragments/groupedProductOptionsFragment';

export default gql`
  ${GroupedProductOptionsData}
  
query groupedProductDetail($search: String = "", $filter: ProductAttributeFilterInput, $pageSize: Int = 20, $currentPage: Int = 1, $sort: ProductAttributeSortInput) {
  products(search: $search, filter: $filter, sort: $sort, pageSize: $pageSize, currentPage: $currentPage) {
    items {
      uid
      ...GroupedProductOptionsData
    }
  }
}`;
