export const availableStores = ({ variables, metadata }: { variables: any; metadata: any }) => {
  return {
    variables,
    query: `
      query availableStores {
        availableStores {
          ${metadata?.fields}
        }
      }
     `,
  };
};
