import gql from 'graphql-tag';

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
