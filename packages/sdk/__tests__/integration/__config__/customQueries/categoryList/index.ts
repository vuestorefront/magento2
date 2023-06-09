export const categoryList = ({ variables, metadata }: { variables: any, metadata: any }) => {
  return {
    variables,
    query: `
      query categoryList {
        categories {
          ${metadata.fields}
        }
      }
    `
  };
};
