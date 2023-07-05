export const getAvailableCustomerShippingMethods = ({ variables, metadata }: { variables: any; metadata: any }) => {
  return {
    variables,
    query: `
      query CustomerAvailableShippingMethods {
        customerCart {
          ${metadata?.fields}
        }
      }
     `,
  };
};
