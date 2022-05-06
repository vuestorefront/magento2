import { gql } from 'graphql-request';

export default gql`
  query getCategoryContentData($filters: CategoryFilterInput) {
    categoryList(filters: $filters) {
      uid
      display_mode
      landing_page
      cms_block {
        identifier
        content
      }
    }
  }
`;
