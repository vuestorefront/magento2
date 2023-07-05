export const createCustomer = ({ variables, metadata }: { variables: any; metadata: any }) => {
  return {
    variables,
    query: `
      mutation createCustomer($input: CustomerCreateInput!) {
        createCustomerV2(input: $input) {
          customer {
            ${metadata.fields}
          }
        }
      }`,
  };
};
