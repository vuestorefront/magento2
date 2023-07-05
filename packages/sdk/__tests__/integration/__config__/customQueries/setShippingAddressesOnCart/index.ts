export const setShippingAddressesOnCart = ({ variables, metadata }: { variables: any; metadata: any }) => {
  return {
    variables,
    query: `
     mutation setShippingAddressesOnCart($input: SetShippingAddressesOnCartInput) {
      setShippingAddressesOnCart(input: $input) {
        cart {
          ${metadata.fields}
        }
      }
    }`,
  };
};
