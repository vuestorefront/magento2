/** GraphQL Query that searches for categories using filters. */
export default `
  query categorySearch($filters: CategoryFilterInput) {
    categoryList(filters: $filters) {
      include_in_menu
      is_anchor
      level
      name
      position
      product_count
      uid
      url_key
      url_path
      url_suffix
      children {
        include_in_menu
        is_anchor
        level
        name
        position
        product_count
        uid
        url_key
        url_path
        url_suffix
      }
    }
  }
`;
