export const countries = ({ variables, metadata }: { variables: any; metadata: any }) => {
  return {
    variables,
    query: `
      query countriesList {
        countries {
          ${metadata?.fields}
        }
      }
     `,
  };
};
