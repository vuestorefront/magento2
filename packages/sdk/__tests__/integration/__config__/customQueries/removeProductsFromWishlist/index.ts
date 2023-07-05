export const removeProductsFromWishlist = ({ variables, metadata }: { variables: any; metadata: any }) => {
  return {
    variables,
    query: `
      mutation removeProductsFromWishlist($id: ID!, $items: [ID!]!) {
        removeProductsFromWishlist(wishlistId: $id, wishlistItemsIds: $items) {
          wishlist {
            ${metadata.fields}
          }
        }
      }
     `,
  };
};
