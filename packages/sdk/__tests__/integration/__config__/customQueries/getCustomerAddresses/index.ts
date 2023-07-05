export const getCustomerAddresses = ({ variables, metadata }: { variables: any; metadata: any }) => {
  return {
    variables,
    query: `
      query getCustomerAddresses {
        customer {
          addresses {
            ${metadata.fields}
          }
        }
      }
     `,
  };
};
