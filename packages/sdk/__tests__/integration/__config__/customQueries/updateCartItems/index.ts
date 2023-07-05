export const updateCartItems = ({ variables, metadata }: { variables: any; metadata: any }) => {
  return {
    variables,
    query: `
      mutation updateCartItems($input: UpdateCartItemsInput) {
          updateCartItems(input: $input) {
            cart {
            ${metadata.fields}
          }
        }
      }`,
  };
};
