export const updateCustomerAddress = ({ variables, metadata }: { variables: any; metadata: any }) => {
  return {
    variables,
    query: `
      mutation updateCustomerAddress($id: Int!, $input: CustomerAddressInput) {
        updateCustomerAddress(id: $id, input: $input) {
          ${metadata.fields}
        }
      }
    `,
  };
};
