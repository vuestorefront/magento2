export const updateCustomer = ({ variables, metadata }: { variables: any; metadata: any }) => {
  return {
    variables,
    query: `
      mutation updateCustomer($input: CustomerUpdateInput!) {
        updateCustomerV2(input: $input) {
          customer {
            ${metadata.fields}
          }
        }
      }
     `,
  };
};
