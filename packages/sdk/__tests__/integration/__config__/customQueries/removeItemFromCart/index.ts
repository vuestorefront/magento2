export const removeItemFromCart = ({ variables, metadata }: { variables: any; metadata: any }) => {
  return {
    variables,
    query: `
      mutation removeItemFromCart($input: RemoveItemFromCartInput) {
        removeItemFromCart(input: $input) {
          cart {
            ${metadata.fields}
          }
        }
      }`,
  };
};
