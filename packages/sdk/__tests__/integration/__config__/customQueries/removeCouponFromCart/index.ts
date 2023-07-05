export const removeCouponFromCart = ({ variables, metadata }: { variables: any; metadata: any }) => {
  return {
    variables,
    query: `
    mutation removeCouponFromCart($input: RemoveCouponFromCartInput) {
      removeCouponFromCart(input: $input) {
        ${metadata.fields}
      }
    }`,
  };
};
