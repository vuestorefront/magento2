import gql from 'graphql-tag';

/** GraphQL Query that searches for categories using filters. */
export default gql`
  query categorySearch($filters: CategoryFilterInput) {
    categoryList(filters: $filters) {
      include_in_menu
      is_anchor
      level
      name
      position
      product_count
      uid
      url_path
      url_suffix
    }
  }
`;
