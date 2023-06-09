export const categorySearch = ({ variables, metadata }: { variables: any, metadata: any }) => {
  return {
    variables,
    query: `
      query categorySearch($filters: CategoryFilterInput) {
        categoryList(filters: $filters) {
          ${metadata.fields}
        }
      }
     `
  };
};
