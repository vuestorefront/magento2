import gql from 'graphql-tag';
import CustomerReturnFragment from '../../fragments/customerReturnFragment';

export default gql`
query customerReturns($currentPage: Int = 1, $pageSize: Int = 20) {
  customer {
    returns(currentPage: $currentPage, pageSize: $pageSize) {
      items {
        ${CustomerReturnFragment}
      }
      page_info {
        current_page
        page_size
        total_pages
      }
      total_count
    }
  }
}`;
