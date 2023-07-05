export const customer = ({ variables, metadata }: { variables: any; metadata: any }) => {
  return {
    variables,
    query: `
      query customer {
        customer {
          ${metadata.fields}
        }
      }
     `,
  };
};
