import gql from 'graphql-tag';

export default gql`
  query customerProductReview($pageSize: Int = 10, $currentPage: Int = 1) {
    customer {
        reviews(pageSize: $pageSize, currentPage: $currentPage) {
          items {
            average_rating
            ratings_breakdown {
              name
              value
            }
            nickname
            summary
            text
            created_at
            product {
              name
              uid
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
`;
