export const createCustomerAddress = ({ variables, metadata }: { variables: any; metadata: any }) => {
  return {
    variables,
    query: `
      mutation createCustomerAddress($input: CustomerAddressInput!) {
        createCustomerAddress(input: $input) {
          ${metadata.fields}
        }
      }
     `,
  };
};
