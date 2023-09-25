export const route = ({ variables, metadata }: { variables: any; metadata: any }) => {
  return {
    variables,
    query: `
      query route($url: String!) {
        route(url: $url) {
          ${metadata?.fields}
        }
      }
     `,
  };
};
