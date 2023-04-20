export const addProductToWishList = ({ variables, metadata }: { variables: any, metadata: any }) => {
  return {
    variables,
    query: `
      mutation addProductsToWishlist($id: ID!, $items: [WishlistItemInput!]!) {
        addProductsToWishlist(wishlistId: $id, wishlistItems: $items) {
          wishlist {
            ${metadata.fields}
          }
        }
      }
     `
  };
};
