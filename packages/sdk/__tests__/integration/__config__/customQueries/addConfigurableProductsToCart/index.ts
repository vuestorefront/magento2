export const addConfigurableProductsToCart = ({ variables, metadata }: { variables: any; metadata: any }) => {
  return {
    variables,
    query: `
      mutation addConfigurableProductsToCart($input: AddConfigurableProductsToCartInput) {
        addConfigurableProductsToCart(input: $input) {
          cart {
            ${metadata.fields}
          }
        }
      }`,
  };
};
