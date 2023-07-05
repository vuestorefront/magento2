export const reviews = ({ variables, metadata }: { variables: any; metadata: any }) => {
  return {
    variables,
    query: `
      query reviews($pageSize: Int = 10, $currentPage: Int = 1) {
        customer {
            reviews(pageSize: $pageSize, currentPage: $currentPage) {
              ${metadata?.fields}
            }
        }
      }
     `,
  };
};
