import gql from 'graphql-tag';
import productFragment from '../../fragments/productFragment';

export default gql`
  query wishlist($currentPage: Int = 1, $pageSize: Int = 10) {
    customer {
      wishlists {
        id
        items_count
        sharing_code
        items_v2(currentPage: $currentPage, pageSize: $pageSize) {
          items {
            id
            quantity
            description
            added_at
            product {
              ${productFragment}
            }
          }
          page_info {
            current_page
            page_size
            total_pages
          }
        }
      }
    }
  }
`;
