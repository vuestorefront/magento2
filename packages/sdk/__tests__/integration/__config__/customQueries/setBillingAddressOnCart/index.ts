export const setBillingAddressOnCart = ({ variables, metadata }: { variables: any; metadata: any }) => {
  return {
    variables,
    query: `
     mutation setBillingAddressOnCart($input: SetBillingAddressOnCartInput) {
      setBillingAddressOnCart(input: $input) {
        cart {
         ${metadata.fields}
        }
      }
    }`,
  };
};
