import gql from 'graphql-tag';

export default gql`
  query productReview($search: String = "", $filter: ProductAttributeFilterInput, $pageSize: Int = 10, $currentPage: Int = 1, $sort: ProductAttributeSortInput) {
    products(search: $search, filter: $filter, sort: $sort) {
      items {
        review_count
        reviews(pageSize: $pageSize, currentPage: $currentPage) {
          items {
            average_rating
            ratings_breakdown {
              name
              value
            }
            product {
              name
              uid
            }
            nickname
            summary
            text
            created_at
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
