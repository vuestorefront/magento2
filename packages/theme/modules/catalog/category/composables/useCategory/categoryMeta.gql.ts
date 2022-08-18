export default `
  query categoryMeta($filters: CategoryFilterInput) {
    categories(filters: $filters) {
      items {
        meta_title
        meta_description
        meta_keywords
        name
      }
    }
  }
`;
