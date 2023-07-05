export const storeConfig = ({ variables, metadata }: { variables: any; metadata: any }) => {
  return {
    variables,
    query: `
      query storeConfig {
        storeConfig {
          ${metadata?.fields}
        }
      }
     `,
  };
};
