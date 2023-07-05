export const setShippingMethodsOnCart = ({ variables, metadata }: { variables: any; metadata: any }) => {
  return {
    variables,
    query: `
     mutation setShippingMethodsOnCart($input: SetShippingMethodsOnCartInput) {
      setShippingMethodsOnCart(input: $input) {
        cart {
          ${metadata.fields}
        }
      }
    }`,
  };
};
