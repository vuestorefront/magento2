export const applyCouponToCart = ({ variables, metadata }: { variables: any; metadata: any }) => {
  return {
    variables,
    query: `
    mutation applyCouponToCart($input: ApplyCouponToCartInput) {
      applyCouponToCart(input: $input) {
        ${metadata.fields}
      }
    }`,
  };
};
