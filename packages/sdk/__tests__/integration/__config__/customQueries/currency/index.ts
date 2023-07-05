export const currency = ({ variables, metadata }: { variables: any; metadata: any }) => {
  return {
    variables,
    query: `
      query currency {
        currency{
          ${metadata?.fields}
        }
      }
     `,
  };
};
