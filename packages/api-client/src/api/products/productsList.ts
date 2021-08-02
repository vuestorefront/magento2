import gql from 'graphql-tag';
import ProductData from '../../fragments/productFragment';

export default gql`
  ${ProductData}
query productsList($search: String = "", $filter: ProductAttributeFilterInput, $pageSize: Int = 20, $currentPage: Int = 1, $sort: ProductAttributeSortInput) {
  products(search: $search, filter: $filter, pageSize: $pageSize, currentPage: $currentPage, sort: $sort) {
    aggregations {
      attribute_code
      label
      options {
        label
        value
        count
      }
    }
    items {
      ...ProductData
    }
    page_info {
      current_page
      page_size
      total_pages
    }
    total_count
  }
}`;
