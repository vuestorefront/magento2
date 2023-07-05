export const setPaymentMethodOnCart = ({ variables, metadata }: { variables: any; metadata: any }) => {
  return {
    variables,
    query: `
     mutation setPaymentMethodOnCart($input: SetPaymentMethodOnCartInput) {
      setPaymentMethodOnCart(input: $input) {
        cart {
          ${metadata.fields}
        }
      }
    }`,
  };
};
