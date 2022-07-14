export default `
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
