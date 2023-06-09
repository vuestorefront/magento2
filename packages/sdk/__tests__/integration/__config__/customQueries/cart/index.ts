export const cart = ({ variables, metadata }: { variables: any, metadata: any }) => {
  return {
    variables,
    query: `
    query cart($cartId: String!) {
      cart(cart_id:$cartId) {
        ${metadata.fields}
      }
    }`
  };
};
