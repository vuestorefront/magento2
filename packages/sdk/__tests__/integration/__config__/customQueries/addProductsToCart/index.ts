export const addProductsToCart = ({ variables, metadata }: { variables: any; metadata: any }) => {
  return {
    variables,
    query: `
      mutation addProductsToCart($cartId: String!, $cartItems: [CartItemInput!]!) {
        addProductsToCart(cartId: $cartId, cartItems: $cartItems) {
          cart {
            ${metadata.fields}
          }
        }
      }`,
  };
};
