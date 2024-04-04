export const addBundleProductsToCart = ({ variables, metadata }: { variables: any; metadata: any }) => {
  return {
    variables,
    query: `
      mutation addBundleProductsToCart($input: AddBundleProductsToCartInput) {
        addBundleProductsToCart(input: $input) {
          cart {
            ${metadata.fields}
          }
        }
      }`,
  };
};
