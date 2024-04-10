export const categories = ({ variables, metadata }: { variables: any; metadata: any }) => {
  return {
    variables,
    query: `
      query categories {
        categories {
          ${metadata.fields}
        }
      }
    `,
  };
};
