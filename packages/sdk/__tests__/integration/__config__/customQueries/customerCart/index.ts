export const customerCart = ({ variables, metadata }: { variables: any; metadata: any }) => {
  return {
    variables,
    query: `
      query customerCart {
        customerCart {
          ${metadata.fields}
        }
      }
     `,
  };
};
